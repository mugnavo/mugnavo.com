import { Button } from "@/components/ui/button";

export function ButtonLink({
  children,
  linkProps,
  ...props
}: React.ComponentProps<typeof Button> & { linkProps?: React.ComponentPropsWithoutRef<"a"> }) {
  // oxlint-disable-next-line jsx_a11y/anchor-has-content
  return (
    <Button {...props} render={<a {...linkProps} />}>
      {children}
    </Button>
  );
}
