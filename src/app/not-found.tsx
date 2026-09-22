import Link from "next/link";

export default function NotFound() {
  return (
    <main className="entry grid-lines">
      <div className="entry__inner">
        <section>
          <p className="mono-label red">404</p>
          <h1 className="display rgb" data-text="YOU WERE NOT SUPPOSED TO FIND THIS." style={{ marginTop: 14 }}>
            YOU WERE NOT SUPPOSED TO FIND THIS.
          </h1>
          <p className="page__intro">
            This node is not on any map. Someone removed it.
          </p>
          <p className="mono-label" style={{ marginTop: 34 }}>
            ACCESS
          </p>
          <p style={{ marginTop: 8 }}>
            <Link href="/origin" className="toxic">
              /ORIGIN
            </Link>
            <span className="caret" style={{ marginLeft: 8 }} />
          </p>
          <p style={{ marginTop: 34 }}>
            <Link href="/" className="btn">
              RETURN TO THE NETWORK
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
