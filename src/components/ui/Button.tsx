import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import styles from "./Button.module.css";

type Variant = "primary" | "ghost" | "outline";

type CommonProps = {
  variant?: Variant;
  fullWidth?: boolean;
  /** White-on-dark styling for use over photographic/navy sections (hero, manifesto, closing). */
  inverted?: boolean;
  className?: string;
};

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = AsButton | AsLink;

/**
 * Renders a real `<button>` or a real `<Link>`/`<a>` — never a dead
 * `href="#"` or an inert-looking control. Disabled state is honest: a
 * disabled CTA stays visibly disabled, it never silently does nothing.
 */
export default function Button(props: ButtonProps) {
  const { variant = "primary", fullWidth, inverted, className } = props;
  const classes = [
    styles.base,
    styles[variant],
    inverted ? styles.inverted : "",
    fullWidth ? styles.fullWidth : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- stripping style props before spreading onto the DOM node
    const { href, external, variant: _v, fullWidth: _fw, inverted: _inv, className: _c, ...rest } = props;
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
          {props.children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {props.children}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- stripping style props before spreading onto the DOM node
  const { variant: _v2, fullWidth: _fw2, inverted: _inv2, className: _c2, ...rest } = props as AsButton;
  return (
    <button type="button" className={classes} {...rest}>
      {props.children}
    </button>
  );
}
