'use server';

export async function submitApplication(formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const artForm = formData.get('artForm');
  const city = formData.get('city');
  const message = formData.get('message');

  // Simulate network delay and backend processing
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // In a real application, you would save this to a database or send an email here.
  console.log(`New Performance Application Received!
Name: ${name}
Email: ${email}
Art Form: ${artForm}
City: ${city}
Message: ${message}
  `);

  return { success: true, message: "Application received successfully!" };
}
