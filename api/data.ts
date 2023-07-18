// import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: any, res: any) {
  if (req.method === "POST") {
    // Process a POST request
    // get request data
    const data = req.body;

    // for debugging
    console.log("recieved form data:", data);

    // save data to cooki e
    // so later in the component we can grab the data from cookie by the cookie key
    // res.setHeader("Set-Cookie", [`nuvo_form_data=${JSON.stringify(data)}`]);

    // parse to JWT + secret key

    // redirect to home form
    // pass token string in url params
    res
      .setHeader("Set-Cookie", [`nuvo_form_data=${JSON.stringify(data)}`])
      .redirect(302, `/?token=${JSON.stringify(data)}`);
  } else {
    // Handle any other HTTP method
    // redirect to home form
    res.redirect("/");
  }
}
