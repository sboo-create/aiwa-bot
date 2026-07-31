import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AppBar,
  Cell,
  Page,
  SectionList,
  SplitView,
  TMAProvider,
  useAppearance,
} from "@deslop/tma";
import MoonIcon from "./assets/moon.svg?react";
import SunIcon from "./assets/sun.svg?react";
import { storybookConfig, storybookPages } from "./config";

const DEFAULT_PATH = "/ui-kit/colors";

function readPath() {
  const hash = window.location.hash.replace(/^#/, "");
  return hash || DEFAULT_PATH;
}

function useStorybookPath() {
  const [path, setPath] = useState(readPath);

  useEffect(() => {
    const onHashChange = () => setPath(readPath());
    window.addEventListener("hashchange", onHashChange);
    if (!window.location.hash) window.location.hash = DEFAULT_PATH;
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return path;
}

function useWideLayout() {
  const [wide, setWide] = useState(() => window.matchMedia("(min-width: 768px)").matches);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = () => setWide(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return wide;
}

function StorybookAppBar({ title, back = false, themeToggle = true }) {
  const { colorScheme, toggleColorScheme } = useAppearance();
  const isDark = colorScheme === "dark";
  const ThemeIcon = isDark ? SunIcon : MoonIcon;
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <AppBar
      title={title}
      back={back}
      {...(themeToggle ? {
        right: <ThemeIcon aria-hidden="true" focusable="false" />,
        onRight: toggleColorScheme,
        rightAriaLabel: label,
        rightTitle: label,
      } : {})}
    />
  );
}

function normalizeSearchValue(value) {
  return value
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("ru-RU");
}

function CatalogSearch({ query, onChange }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      const isEditing = target instanceof HTMLElement
        && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
      const isCommandSearch = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      const isSlashSearch = event.key === "/" && !isEditing;

      if (!isCommandSearch && !isSlashSearch) return;
      event.preventDefault();
      inputRef.current?.focus();
      inputRef.current?.select();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <search className="aiwa-storybook-search">
      <label className="aiwa-storybook-search-field">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path
            d="m20 20-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.8"
          />
        </svg>
        <span className="aiwa-storybook-visually-hidden">Поиск по компонентам</span>
        <input
          ref={inputRef}
          type="search"
          value={query}
          placeholder="Найти компонент"
          aria-label="Поиск по компонентам"
          aria-keyshortcuts="/ Meta+K Control+K"
          autoComplete="off"
          spellCheck="false"
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape" && query) {
              event.preventDefault();
              onChange("");
            }
          }}
        />
        {query ? (
          <button type="button" aria-label="Очистить поиск" onClick={() => onChange("")}>
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path
                d="m7.5 7.5 9 9m0-9-9 9"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.8"
              />
            </svg>
          </button>
        ) : (
          <kbd aria-hidden="true">/</kbd>
        )}
      </label>
    </search>
  );
}

function CatalogList() {
  const [query, setQuery] = useState("");
  const filteredConfig = useMemo(() => {
    const terms = normalizeSearchValue(query).trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return storybookConfig;

    return storybookConfig
      .map(({ category, pages }) => ({
        category,
        pages: pages.filter((page) => {
          const searchableValue = normalizeSearchValue([
            category,
            page.title,
            page.path,
            ...(page.searchTerms || []),
          ].join(" "));
          return terms.every((term) => searchableValue.includes(term));
        }),
      }))
      .filter(({ pages }) => pages.length);
  }, [query]);
  const resultCount = filteredConfig.reduce((total, group) => total + group.pages.length, 0);

  return (
    <>
      <CatalogSearch query={query} onChange={setQuery} />
      {resultCount ? (
        <SectionList>
          {filteredConfig.map(({ category, pages }) => (
            <SectionList.Item header={category} key={category}>
              {pages.map((page) => (
                <Cell
                  as="a"
                  href={`#${page.path}`}
                  end={<Cell.Part type="Chevron" />}
                  key={page.path}
                >
                  <Cell.Text title={page.title} />
                </Cell>
              ))}
            </SectionList.Item>
          ))}
        </SectionList>
      ) : (
        <div className="aiwa-storybook-search-empty" role="status">
          <strong>Компоненты не найдены</strong>
          <span>Попробуйте другое название или категорию.</span>
          <button type="button" onClick={() => setQuery("")}>Сбросить поиск</button>
        </div>
      )}
    </>
  );
}

function CatalogPage() {
  return (
    <Page>
      <CatalogList />
    </Page>
  );
}

function StoryPage({ page, compact = false }) {
  const Component = page.component;

  if (compact) {
    return (
      <div className="aiwa-storybook-detail-shell">
        <StorybookAppBar title={page.title} themeToggle={false} />
        <div className="aiwa-storybook-detail-scroll">
          <Component />
        </div>
      </div>
    );
  }

  return (
    <>
      <StorybookAppBar title={page.title} back />
      <Component />
    </>
  );
}

function StorybookShell() {
  const path = useStorybookPath();
  const wide = useWideLayout();
  const page = useMemo(
    () => storybookPages.find((item) => item.path === path) || storybookPages[0],
    [path],
  );

  if (!wide) {
    if (path === "/") {
      return (
        <>
          <StorybookAppBar title="Storybook" />
          <CatalogPage />
        </>
      );
    }
    return <StoryPage key={page.path} page={page} />;
  }

  return (
    <>
      <Page mode="secondary" />
      <SplitView>
        <SplitView.Sidebar>
          <StorybookAppBar title="Storybook" />
          <CatalogList />
        </SplitView.Sidebar>
        <SplitView.Detail>
          <StoryPage key={page.path} page={page} compact />
        </SplitView.Detail>
      </SplitView>
    </>
  );
}

export function StorybookApp() {
  return (
    <TMAProvider>
      <StorybookShell />
    </TMAProvider>
  );
}
