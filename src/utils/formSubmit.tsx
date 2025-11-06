export function logFormData(formElement: HTMLFormElement) {
  const formData = new FormData(formElement);
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
}

export async function submitFormData(formElement: HTMLFormElement, url: string) {
  const formData = new FormData(formElement);
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  return response;
}
