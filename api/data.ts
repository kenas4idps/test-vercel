import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    // Process a POST request
    // get request data
    const data = req.body;

    // for debugging
    console.log("recieved form data:", data);

    const options = "; SameSite=None; Secure; path=/; max-age=2592000;";

    // save data to cooki e
    // so later in the component we can grab the data from cookie by the cookie key
    res.setHeader("Set-Cookie", [
      `nuvo_form_data=${JSON.stringify(data)}${options}`,
      `cookie_2=hello${options}`,
    ]);

    // redirect to home form
    res.redirect(302, `/`);
  } else {
    // Handle any other HTTP method
    // redirect to home form
    res.redirect("/");
  }
}
