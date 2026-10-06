
import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";

const FR = "https://framerusercontent.com";

type Item = { label: string; image: string; video?: string };
type Ticker = { id: string; tab: string; items: Item[] };

const TICKERS: Ticker[] = [
  {
    id: "screens",
    tab: "Screens",
    items: [
      { label: "Collections", image: `${FR}/images/k8hEWkK4RpDyBCEgjvHBSwm1JQ.png?width=1179&height=2556` },
      { label: "Checkout", image: `${FR}/images/7hVUbHyK3n4QplrFKa7gTlTUh04.png?width=1125&height=2436` },
      { label: "Settings", image: `${FR}/images/YDK9qSi5zYnuLqk9SBP0Y0OJH0.png?width=1284&height=2778` },
      { label: "Login", image: `${FR}/images/4R3nm6kamDN2734jGmMO0sxUg.png?width=1125&height=2436` },
      { label: "Subscription & Paywall", image: `${FR}/images/evR6KdT5pwE7UT9Zde63FVIXc.png?width=1125&height=2436` },
      { label: "Home", image: `${FR}/images/tpQyn4tNnYbnCgipNO7sqEkAF8.png?width=1125&height=2436` },
      { label: "Account Setup", image: `${FR}/images/SGrF7lCxoPEcHNoCvQaqyReKXM.png?width=1125&height=2436` },
      { label: "Welcome", image: `${FR}/images/bDjlYD3Igj8zLTIseAVpfsg1LVo.png?width=1180&height=2556` },
      { label: "Wallet", image: `${FR}/images/ueplS6l6dAvHympTkVBV4OYYw.png?width=1125&height=2436` },
      { label: "Profile", image: `${FR}/images/oAI4nXzcw7RVxBHvch8lCDhtwY.png?width=1126&height=2436` },
    ],
  },
  {
    id: "ui-elements",
    tab: "UI Elements",
    items: [
      { label: "Slider", image: `${FR}/images/yT3kv5drMsbZmpGqxH03q2Xr6zw.png?width=768&height=1662` },
      { label: "Carousel", image: `${FR}/images/HSZ7a3tXCsvrmEDrvYwuqHGFs.png?width=768&height=1662` },
      { label: "Sidebar", image: `${FR}/images/TBajAWvUPazrHQCytuqOtiVHro.png?width=768&height=1662` },
      { label: "Bottom Sheet", image: `${FR}/images/lGjk1RJWmlw5bKuImRCUdUADQuE.png?width=768&height=1662` },
      { label: "Icon", image: `${FR}/images/Bw18qHLeyyYXs4Nd0tB4vajWA.png?width=768&height=1662` },
      { label: "Toast", image: `${FR}/images/HIQb9tOP3UYygdQttzMC1wtS2I.png?width=768&height=1662` },
      { label: "Progress Indicator", image: `${FR}/images/7DCnfay6uGITLECOMgaJT1BG9DU.png?width=768&height=1662` },
      { label: "Dialog", image: `${FR}/images/ebUAozvxXnmlBH0EN7OkDSGtFA.png?width=768&height=1662` },
      { label: "Tab", image: `${FR}/images/raRJtvUQBkahGIJ2gNfMNGkNBk.png?width=768&height=1662` },
      { label: "Button", image: `${FR}/images/ge8KzfWcILVm8a8W4KPQGhcOxto.png?width=768&height=1662` },
    ],
  },
  {
    id: "flows",
    tab: "Flows",
    items: [
      { label: "Adding & Creating", video: `${FR}/assets/23lFTBKg8wJxmz1Fzo8oZbd4W4.mp4`, image: `${FR}/images/IqKq05Z2uUqVDWFFHOHMi800rg.png?width=1180&height=2556` },
      { label: "Adding to Cart", video: `${FR}/assets/bDQsvv88W4hIxSoRyNUuTLGvc.mp4`, image: `${FR}/images/6yXBiH9xw7Gxdx0Mrt2bcPjSr5w.png?width=1180&height=2556` },
      { label: "Listening to Audio", video: `${FR}/assets/xmFOxuIl3xL9sNw6nHZemKPyjAM.mp4`, image: `${FR}/images/O7OQemzKZ7eV3gaYJtSLPQlxeM.png?width=1180&height=2556` },
      { label: "Searching", video: `${FR}/assets/8O2f3cBAKD1Pq7awjLVKYpSMXI.mp4`, image: `${FR}/images/FHxYYUMfpdjnT7fNZPqPCJYhvs.png?width=1180&height=2556` },
      { label: "Browsing Home", video: `${FR}/assets/nVEPCWYMRzv1E4G1xomOoa29LD4.mp4`, image: `${FR}/images/0816xV3EK0Fkkl43Oc4PgaQSoo.png?width=1180&height=2556` },
      { label: "Starting & Completing", video: `${FR}/assets/EwVBHivTuCXdcomOKlhNeWVKQ.mp4`, image: `${FR}/images/vIcmbTMQgS9ISaV9kRZoGdgVac.png?width=1180&height=2556` },
      { label: "Browsing Tutorial", video: `${FR}/assets/9D4HOZVt4niJ5LqMQCbFqNkLo.mp4`, image: `${FR}/images/BjHfJdt1QsmxS0cOuD9Ya8XjWX0.png?width=1180&height=2556` },
      { label: "Chatting", video: `${FR}/assets/QDOlNmEsW3de023pNne5OgcgaNg.mp4`, image: `${FR}/images/Wu7l85fYKHwvg7BJzEbQxhz4KDI.png?width=1180&height=2556` },
      { label: "Subscribing", video: `${FR}/assets/pZ2IctNdZT9F7yGEZJTxPPsVE.mp4`, image: `${FR}/images/faNt8OibXmADZ0VylOMpAHTwtDU.png?width=1180&height=2556` },
      { label: "Onboarding", video: `${FR}/assets/vzjqHhkVsUComnOlI8Bg5X6zeo4.mp4`, image: `${FR}/images/Hfc9JwhH7zKAfyfu12YSO3O0Vg.png?width=1180&height=2556` },
    ],
  },
  {
    id: "text",
    tab: "Text in Screenshots",
    items: [
      { label: "Follow", image: `${FR}/images/gw3g2c0tUg3TOGTblRW7OqTqo.png?width=768&height=1662` },
      { label: "Recommend", image: `${FR}/images/ZvFE6gd50g2RDU8K0oBsUM7LeY.png?width=768&height=1662` },
      { label: "Explore", image: `${FR}/images/rnBdemxq2IF8gbDgANtGYpPxQ.png?width=768&height=1662` },
      { label: "Refund", image: `${FR}/images/Z4hBIh1OdYQ8BVJlzQVp2n0kqcQ.png?width=768&height=1662` },
      { label: "Payment", image: `${FR}/images/oj8aUU00or7zNvbgHPuAhZ1wXEk.png?width=768&height=1662` },
      { label: "Cashback", image: `${FR}/images/u0pbtYKTvzb0amIBUT7iPl2Jio.png?width=768&height=1662` },
      { label: "Category", image: `${FR}/images/5p4zVknOoeehLRLp5Bfvd6tvxQ.png?width=768&height=1662` },
      { label: "Pro", image: `${FR}/images/sbfHRXZbwpxd87OP72UpXENfL0.png?width=768&height=1662` },
      { label: "Show All", image: `${FR}/images/T0XBpPp4fmRO6FJOwKfG7PsHvg.png?width=768&height=1662` },
      { label: "Pay Later", image: `${FR}/images/6jnK7t8AuvWWelwKPn6NywsZs3s.png?width=768&height=1662` },
    ],
  },
];

/**
 * "Find design patterns in seconds." — a four-way tab switcher over four
 * endless tickers of app screens. Tabs follow the WAI-ARIA tabs pattern
 * (arrow keys, Home/End); the tickers cross-fade in one grid cell.
 */
export function Patterns() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Park the sliding pill under the active tab. Only geometry crosses into
  // JS; the slide itself is a CSS transition.
  useLayoutEffect(() => {
    const place = () => {
      const tab = tabRefs.current[active];
      const list = tabsRef.current;
      if (!tab || !list) return;
      list.style.setProperty("--tab-x", `${tab.offsetLeft}px`);
      list.style.setProperty("--tab-w", `${tab.offsetWidth}px`);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  const select = (i: number) => {
    setActive(i);
    tabRefs.current[i]?.focus();
    tabRefs.current[i]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const last = TICKERS.length - 1;
    const next =
      e.key === "ArrowRight" ? (active === last ? 0 : active + 1)
      : e.key === "ArrowLeft" ? (active === 0 ? last : active - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    select(next);
  };

  return (
    <section className="lp-section" aria-labelledby="lp-patterns-title">
      <div className="lp-title-block lp-container lp-container-text">
        <h2 id="lp-patterns-title" className="lp-h2">
          Find design patterns
          <br />
          in seconds.
        </h2>
        <div
          ref={tabsRef}
          className="lp-tabs"
          role="tablist"
          aria-label="Pattern library"
          onKeyDown={onKeyDown}
        >
          <span className="lp-tabs-indicator" aria-hidden />
          {TICKERS.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`lp-tab-${t.id}`}
              type="button"
              role="tab"
              className="lp-tab"
              aria-selected={i === active}
              aria-controls={`lp-panel-${t.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
            >
              {t.tab}
            </button>
          ))}
        </div>
      </div>

      <div className="lp-tickers">
        {TICKERS.map((t, i) => (
          <div
            key={t.id}
            id={`lp-panel-${t.id}`}
            role="tabpanel"
            aria-labelledby={`lp-tab-${t.id}`}
            className="lp-ticker"
            data-state={i === active ? "active" : "inactive"}
            inert={i !== active}
          >
            <ul className="lp-ticker-track">
              {[0, 1].map((copy) =>
                t.items.map((item) => (
                  <li key={`${copy}-${item.label}`} className="lp-screen" aria-hidden={copy === 1}>
                    <p className="lp-screen-label">{item.label}</p>
                    {item.video ? (
                      <video
                        className="lp-screen-media"
                        src={item.video}
                        poster={item.image}
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-label={`${item.label} flow`}
                      />
                    ) : (
                      <img
                        className="lp-screen-media"
                        src={item.image}
                        alt={`${item.label} screen`}
                        loading="lazy"
                      />
                    )}
                  </li>
                )),
              )}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
