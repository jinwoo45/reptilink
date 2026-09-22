import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ORIGIN",
  description:
    "What REPTILINK actually is, stated plainly: a fiction layer, and where the line sits.",
  robots: { index: false },
};

export default function Origin() {
  return (
    <main className="page wrap" style={{ maxWidth: 760 }}>
      <p className="mono-label acid">ACCESS GRANTED</p>
      <h1 className="display" style={{ marginTop: 14 }}>
        ORIGIN
      </h1>

      <div className="detail__body" style={{ marginTop: 30 }}>
        <p>
          You followed a broken link and a comment in the page source to get
          here, which is the whole trick. Here is the part that is not a trick.
        </p>
        <p>
          REPTILINK is a <strong className="toxic">fiction layer</strong>. The
          ENTITY IDENTITY, the REPTILIAN INDEX, the SIGNALs on the feed and the
          codenames attached to them are invented. Nothing on this site is a
          real agency, a real disclosure, or a real case file, and nothing here
          impersonates one.
        </p>
        <p>
          The ARCHIVE is the exception, and it is deliberately the exception.
          Every entry carries a classification that says what it actually is —{" "}
          <span className="tag tag--fact">FACT</span>{" "}
          <span className="tag tag--hypothesis">HYPOTHESIS</span>{" "}
          <span className="tag tag--myth">MYTH</span>{" "}
          <span className="tag tag--conspiracy">CONSPIRACY</span>{" "}
          <span className="tag tag--unknown">UNKNOWN</span>{" "}
          <span className="tag tag--fiction">FICTION</span> — and an entry marked
          CONSPIRACY is labelled that way because the evidence does not support
          it, not as a wink.
        </p>
        <p>
          The point of the network was never the mystery. It is that a sentence
          written at 03:21 in Seoul can be read at 22:19 in Berlin, by someone
          who does not share a single word of the writer&apos;s language, and
          that the original is still there underneath, one click away, never
          overwritten.
        </p>
        <p className="toxic">EVERY LANGUAGE. SAME SIGNAL.</p>
      </div>

      <p style={{ marginTop: 40 }}>
        <Link href="/" className="btn">
          ← RETURN
        </Link>
      </p>
    </main>
  );
}
