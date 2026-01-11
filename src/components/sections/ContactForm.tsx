"use client";

import { useMemo, useState } from "react";
import TrackLink from "../analytics/TrackLink";
import TrackButton from "../analytics/TrackButton";

export default function ContactForm({ cafe, locale, formText, site }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(false);

  const waHref = useMemo(() => {
    const to = site?.social?.whatsapp || "";
    const text = encodeURIComponent(
      `Hola! Soy ${name}.\n\n${message}\n\nEmail: ${email || "-"}`
    );
    return to ? `${to}?text=${text}` : "";
  }, [site, name, email, message]);

  const mailHref = useMemo(() => {
    const subject = encodeURIComponent(
      `Contacto desde la web - ${site?.name ?? cafe}`
    );
    const body = encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`
    );
    return `mailto:${site?.email ?? ""}?subject=${subject}&body=${body}`;
  }, [site, cafe, name, email, message]);

  async function submit() {
    setLoading(true);
    setOk(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cafe, locale, name, email, message }),
      });
      setOk(res.ok);
    } catch {
      setOk(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-md border border-border bg-surface shadow-soft p-6">
      <h3 className="text-lg font-semibold">Envíanos un mensaje</h3>

      <div className="mt-4 space-y-3">
        <div>
          <label className="text-sm text-muted">{formText.name}</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 outline-none focus:ring-2 focus:ring-primary2/40"
          />
        </div>

        <div>
          <label className="text-sm text-muted">{formText.email}</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 outline-none focus:ring-2 focus:ring-primary2/40"
          />
        </div>

        <div>
          <label className="text-sm text-muted">{formText.message}</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 w-full min-h-30 rounded-lg border border-border bg-bg px-3 py-2 outline-none focus:ring-2 focus:ring-primary2/40"
          />
        </div>

        <div className="flex flex-col gap-2">
          <TrackButton
            onClick={submit}
            disabled={loading}
            className="rounded-lg bg-primary px-4 py-2 text-white shadow-soft hover:translate-y-px transition disabled:opacity-60"
            eventName="contact"
            eventParams={{ method: "form" }}
          >
            {loading ? "Enviando..." : "Guardar y enviar"}
          </TrackButton>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <TrackLink
              href={waHref}
              target="_blank"
              className="text-center rounded-lg border border-border bg-bg px-4 py-2 hover:bg-primary2/20 transition"
              eventName="contact_click"
              eventParams={{ method: "whatsapp" }}
            >
              {formText.sendWhatsapp}
            </TrackLink>
            <TrackLink
              href={mailHref}
              className="text-center rounded-lg border border-border bg-bg px-4 py-2 hover:bg-primary2/20 transition"
              eventName="contact_click"
              eventParams={{ method: "email" }}
            >
              {formText.sendEmail}
            </TrackLink>
          </div>

          {ok === true && (
            <p className="text-sm text-muted">✅ Mensaje registrado.</p>
          )}
          {ok === false && (
            <p className="text-sm text-muted">❌ No se pudo enviar.</p>
          )}
        </div>
      </div>
    </div>
  );
}
