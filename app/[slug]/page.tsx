import { S3Client, ListObjectsV2Command, _Object } from "@aws-sdk/client-s3"
import { Bucket } from "sst/node/bucket"

const s3Client = new S3Client({ region: "us-east-1" }) // as NodeJsClient<S3Client>

export const generateStaticParams = async () => {
  let paths: { params: { slug: string } }[] = []
  try {
    const data = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: Bucket.Bucket.bucketName,
      })
    )
  
    if (data.Contents) {
      paths = data.Contents.map((file) => ({
        params: { slug: file.Key as string },
      }))
    }
    return paths
  } catch {
    console.log('fuck')
    return paths
  }

}

export default async function NewsletterPage({ params }: { params: any }) {
  return <p>hello</p>
}
