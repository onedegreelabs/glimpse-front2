async function s3UrlToFile(url: string, fileName: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();

  const file = new File([blob], fileName, {
    type: blob.type,
  });

  return file;
}

export default s3UrlToFile;
