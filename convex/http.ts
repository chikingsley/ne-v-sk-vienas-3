import type { WebhookEvent } from "@clerk/backend";
import { httpRouter } from "convex/server";
import { Webhook } from "svix";
import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const event = await validateRequest(request);
    if (!event) {
      return new Response("Invalid webhook signature", { status: 400 });
    }

    switch (event.type) {
      case "user.created":
      case "user.updated":
        await ctx.runMutation(internal.users.upsertFromClerk, {
          data: {
            id: event.data.id,
            email_addresses: event.data.email_addresses,
            first_name: event.data.first_name,
            last_name: event.data.last_name,
            image_url: event.data.image_url,
          },
        });
        break;

      case "user.deleted": {
        const clerkUserId = event.data.id;
        if (clerkUserId) {
          await ctx.runMutation(internal.users.deleteFromClerk, {
            clerkUserId,
          });
        }
        break;
      }

      default:
        console.log("Ignored Clerk webhook event:", event.type);
    }

    return new Response(null, { status: 200 });
  }),
});

async function validateRequest(request: Request): Promise<WebhookEvent | null> {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("Missing CLERK_WEBHOOK_SECRET environment variable");
    return null;
  }

  const svixId = request.headers.get("svix-id");
  const svixTimestamp = request.headers.get("svix-timestamp");
  const svixSignature = request.headers.get("svix-signature");

  if (!(svixId && svixTimestamp && svixSignature)) {
    console.error("Missing svix headers");
    return null;
  }

  const body = await request.text();

  const wh = new Webhook(webhookSecret);
  try {
    return wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Webhook verification failed:", error);
    return null;
  }
}

export default http;
