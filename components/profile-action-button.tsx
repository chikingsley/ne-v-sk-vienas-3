"use client";

import { Check, Clock, Loader2, MessageCircle, Send, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/locale-context";

type ConnectionStatus =
  | "matched"
  | "pending_sent"
  | "pending_received"
  | "declined_by_them"
  | "declined_by_me"
  | "none"
  | "not_authenticated";

interface ProfileActionButtonProps {
  status: ConnectionStatus | undefined;
  userId: string;
  hasAvailableDates: boolean;
  isSending: boolean;
  onConnect: () => void;
  onAccept: () => void;
  onDecline: () => void;
}

export function ProfileActionButton({
  status,
  userId,
  hasAvailableDates,
  isSending,
  onConnect,
  onAccept,
  onDecline,
}: ProfileActionButtonProps) {
  const { t } = useLocale();

  if (status === "matched") {
    return (
      <Link
        className="w-full"
        href={`/messages?chat=${userId}&type=conversation`}
      >
        <Button className="w-full gap-2 bg-green-600 hover:bg-green-700">
          <MessageCircle size={18} />
          {t.message}
        </Button>
      </Link>
    );
  }

  if (status === "pending_sent") {
    return (
      <Button className="w-full gap-2" disabled variant="secondary">
        <Clock size={18} />
        {t.requestSent}
      </Button>
    );
  }

  if (status === "pending_received") {
    return (
      <div className="flex w-full gap-2">
        <Button
          className="flex-1 gap-1"
          disabled={isSending}
          onClick={onDecline}
          variant="outline"
        >
          <X size={16} />
          {t.decline}
        </Button>
        <Button
          className="flex-1 gap-1 bg-green-600 hover:bg-green-700"
          disabled={isSending}
          onClick={onAccept}
        >
          {isSending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Check size={16} />
              {t.accept}
            </>
          )}
        </Button>
      </div>
    );
  }

  if (status === "declined_by_them") {
    return (
      <Button className="w-full gap-2" disabled variant="secondary">
        <X size={18} />
        {t.requestDeclined}
      </Button>
    );
  }

  if (status === "declined_by_me") {
    return (
      <Button className="w-full gap-2" disabled variant="secondary">
        <X size={18} />
        {t.youDeclined}
      </Button>
    );
  }

  if (!hasAvailableDates) {
    return (
      <Button className="w-full gap-2" disabled variant="secondary">
        {t.noDatesAvailable}
      </Button>
    );
  }

  return (
    <Button
      className="w-full gap-2 bg-red-500 hover:bg-red-600"
      disabled={isSending}
      onClick={onConnect}
    >
      {isSending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <Send size={18} />
          {t.connect}
        </>
      )}
    </Button>
  );
}
