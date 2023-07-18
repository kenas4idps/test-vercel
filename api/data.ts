import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    // Process a POST request
    // get request data
    const data = req.body;

    // for debugging
    console.log("recieved form data:", data);

    // save data to cooki e
    // so later in the component we can grab the data from cookie by the cookie key
    res.setHeader("Set-Cookie", [`nuvo_form_data=${JSON.stringify(data)}`]);

    // redirect to home form
    res.redirect(302, "/");
  } else {
    // Handle any other HTTP method
    // redirect to home form
    res.redirect("/");
  }
}
