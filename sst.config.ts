import { SSTConfig } from "sst"
import { Bucket, NextjsSite } from "sst/constructs"

export default {
  config(_input) {
    return {
      name: "my-app",
      region: "us-east-1",
    }
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const bucket = new Bucket(stack, "Bucket")

      const site = new NextjsSite(stack, "site", {
        bind: [bucket],
      })

      stack.addOutputs({
        SiteUrl: site.url,
      })
    })
    app.setDefaultRemovalPolicy("destroy")
  },
} satisfies SSTConfig
