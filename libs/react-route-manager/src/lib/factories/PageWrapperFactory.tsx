import React from "react";
import { Helmet } from "react-helmet-async";
import { RouteConfig } from "../types/RouteConfig";

type PageWrapperProps = {
  config: Pick<RouteConfig<Record<string, unknown>>, "description" | "name">;
};

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  config: { name, description },
}) => {
  return (
    <>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content={description ?? "Some Badass Page"} />
      </Helmet>

      {children}
    </>
  );
};

export const RouterMetaWrap = (
  route: Pick<RouteConfig<any>, "name" | "description">,
  Component: any
) => () => (
  <PageWrapper
    config={{
      description: route.description,
      name: route.name,
    }}
  >
    <Component />
  </PageWrapper>
);
