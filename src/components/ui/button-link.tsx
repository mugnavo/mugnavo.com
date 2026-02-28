import { Button } from "@/components/ui/button";

export function ButtonLink({
  children,
  linkProps,
  ...props
}: React.ComponentProps<typeof Button> & { linkProps?: React.ComponentPropsWithoutRef<"a"> }) {
  return (
    // oxlint-disable-next-line jsx_a11y/anchor-has-content
    <Button {...props} render={<a {...linkProps} />}>
      {children}
    </Button>
  );
}
