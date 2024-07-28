import { Callout } from "@tremor/react";

export const CalloutHero = () => (
  <div className="mx-auto max-w-lg space-y-6">
    <Callout title="Sales Performance" color="red">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </Callout>
    <Callout title="Sales Performance" color="teal">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor
      lorem non est congue blandit. Praesent non lorem sodales, suscipit est
      sed, hendrerit dolor.
    </Callout>
    <Callout className="h-36" title="Sales Performance" color="indigo">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor
      lorem non est congue blandit. Praesent non lorem sodales, suscipit est
      sed, hendrerit dolor. Praesent non lorem sodales, suscipit est sed,
      hendrerit dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Phasellus tempor lorem non est congue blandit. Praesent non lorem sodales,
      suscipit est sed, hendrerit dolor.
    </Callout>
  </div>
);
