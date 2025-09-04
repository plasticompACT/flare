
"use client";

import { useState } from "react";

export default function Page() {
  const [p1, setP1] = useState({ name: "", tz: "Europe/Istanbul", channel: "telegram" });
  const [p2, setP2] = useState({ name: "", tz: "Europe/Istanbul", channel: "telegram" });
  const [date, setDate] = useState<string>("");
  const [hour, setHour] = useState<number>(21);
  const [minute, setMinute] = useState<number>(0);
  const [status, setStatus] = useState<string>("");

  async function createRitual() {
    setStatus("Creating...");
    const res = await fetch("/api/rituals", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        participants: [
          { displayName: p1.name, timezone: p1.tz, messenger: p1.channel },
          { displayName: p2.name, timezone: p2.tz, messenger: p2.channel },
        ],
        startDate: date,
        hour,
        minute,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setStatus("Error: " + (data?.error ?? res.statusText));
    } else {
      setStatus("Ritual created! Share this invite link with each partner: " + data.inviteLink);
    }
  }

  return (
    <main className="min-h-screen max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-semibold">Flare</h1>
      <p className="mt-2 opacity-70">11 days, two hearts, one shared spark.</p>
      <div className="mt-8 grid grid-cols-1 gap-6">
        <div className="card">
          <h2 className="font-medium">Partner A</h2>
          <input className="mt-2 w-full border rounded px-3 py-2" placeholder="Name" value={p1.name} onChange={e=>setP1({...p1, name:e.target.value})}/>
          <label className="block mt-3 text-sm">Timezone</label>
          <input className="w-full border rounded px-3 py-2" value={p1.tz} onChange={e=>setP1({...p1, tz:e.target.value})}/>
          <label className="block mt-3 text-sm">Channel</label>
          <select className="w-full border rounded px-3 py-2" value={p1.channel} onChange={e=>setP1({...p1, channel:e.target.value})}>
            <option value="telegram">Telegram</option>
            <option value="pwa">PWA push</option>
          </select>
        </div>
        <div className="card">
          <h2 className="font-medium">Partner B</h2>
          <input className="mt-2 w-full border rounded px-3 py-2" placeholder="Name" value={p2.name} onChange={e=>setP2({...p2, name:e.target.value})}/>
          <label className="block mt-3 text-sm">Timezone</label>
          <input className="w-full border rounded px-3 py-2" value={p2.tz} onChange={e=>setP2({...p2, tz:e.target.value})}/>
          <label className="block mt-3 text-sm">Channel</label>
          <select className="w-full border rounded px-3 py-2" value={p2.channel} onChange={e=>setP2({...p2, channel:e.target.value})}>
            <option value="telegram">Telegram</option>
            <option value="pwa">PWA push</option>
          </select>
        </div>
        <div className="card">
          <h2 className="font-medium">Schedule</h2>
          <label className="block mt-2 text-sm">Start date (YYYY-MM-DD)</label>
          <input className="w-full border rounded px-3 py-2" placeholder="2025-09-05" value={date} onChange={e=>setDate(e.target.value)}/>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <label className="block text-sm">Hour (0-23)</label>
              <input type="number" className="w-full border rounded px-3 py-2" value={hour} onChange={e=>setHour(parseInt(e.target.value))}/>
            </div>
            <div>
              <label className="block text-sm">Minute</label>
              <input type="number" className="w-full border rounded px-3 py-2" value={minute} onChange={e=>setMinute(parseInt(e.target.value))}/>
            </div>
          </div>
        </div>
        <button onClick={createRitual} className="btn btn-primary">
          Create ritual
        </button>
        <p className="text-sm opacity-70">{status}</p>
      </div>
    </main>
  );
}
