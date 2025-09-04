
import { NextRequest, NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

async function sendMessage(chatId: number, text: string) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
  });
}

export async function POST(req: NextRequest) {
  if (!BOT_TOKEN) return NextResponse.json({ ok: false, error: "No bot token" }, { status: 500 });
  const update = await req.json();

  const msg = update?.message;
  const chatId = msg?.chat?.id;
  const text = msg?.text || "";

  if (chatId && typeof text === "string") {
    if (text.startsWith("/start")) {
      const token = text.split(" ").slice(1).join(" ").trim();
      await sendMessage(chatId, "✨ Welcome to Flare. I'll send you a daily prompt for 11 days at your chosen time. I never read your messages.");
      if (token) {
        try {
          const res = await fetch(`${process.env.PUBLIC_BASE_URL}/api/rituals/join`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ token, telegramChatId: chatId }),
          });
          if (res.ok) {
            await sendMessage(chatId, "You are linked to your ritual. I’ll DM you each day’s prompt at your local time. ❤️");
          } else {
            const d = await res.json();
            await sendMessage(chatId, "Hmm, I couldn't join that ritual. " + (d?.error ?? ""));
          }
        } catch (e) {
          await sendMessage(chatId, "Temporary issue linking you. Please try the invite again.");
        }
      } else {
        await sendMessage(chatId, "If you have an invite link, tap it again so I can link you to your ritual.");
      }
    } else {
      await sendMessage(chatId, "I'm only here to deliver prompts and nudges. Reply to your partner in your usual chat ❤️");
    }
  }

  return NextResponse.json({ ok: true });
}
