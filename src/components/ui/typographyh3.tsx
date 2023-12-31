// TODO : should define type

type TypographyProps = {
    variant: "h1" | "h2" | "h3" | "h4" | "p" | "muted";
    children: React.ReactNode;
};
export function Typography({ variant, children }: TypographyProps) {
    if (variant == "h1") {
        return (
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {children}
            </h1>
        );
    }

    if (variant == "h2") {
        return (
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                {children}
            </h2>
        );
    }

    if (variant == "h3") {
        return (
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                {children}
            </h3>
        );
    }

    if (variant == "h4") {
        return (
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                {children}
            </h4>
        );
    }

    if (variant == "p") {
        return (
            <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
        );
    }

    if (variant == "muted") {
        return <p className="text-sm text-muted-foreground">{children}</p>;
    }
}
