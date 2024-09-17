import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [url, setUrl] = useState();
  const navigate = useNavigate();

  const handleShortenUrl = (e) => {
    e.preventDefault();
    if (url) {
      navigate(`/auth?newUrl=${url}`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl sm:text-5xl font-bold text-center pt-16 sm:pt-24">
        Transform Your Links: Shorter, Smarter, Simpler
      </h2>
      <form
        onSubmit={handleShortenUrl}
        className="flex flex-col md:flex-row w-full gap-2 md:w-2/4 my-10"
      >
        <Input
          placeholder="Enter your link here"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="focus:outline-none"
        />
        <Button className="" type="submit">
          Shorten URL
        </Button>
      </form>

      <Accordion type="multiple" collapsible className="w-full my-4 sm:my-14">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Shortify?</AccordionTrigger>
          <AccordionContent>
            Shortify is a URL shortener app that allows you to convert long,
            cumbersome URLs into short, easy-to-share links. It helps you manage
            and track your links more efficiently.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How do I shorten a URL?</AccordionTrigger>
          <AccordionContent>
            Simply paste your long URL into the input box on the homepage and
            click the "Shorten" button. You'll receive a shortened URL that you
            can copy and share.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Can I customize my shortened URLs?
          </AccordionTrigger>
          <AccordionContent>
            Yes, you can customize your short links with your own keywords to
            make them more memorable and relevant.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            How can I track the performance of my shortened links?
          </AccordionTrigger>
          <AccordionContent>
            Shortify offers detailed analytics, including click counts and
            geographic locations of clicks. You can access these insights
            through your dashboard.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default HomePage;
