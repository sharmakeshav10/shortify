import { Copy, Download, Trash } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useFetch from "@/hooks/useFetch";
import { deleteUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const UrlCard = ({ url, fetchUrls }) => {
  const copyUrl = async () => {
    const copiedText = await window.navigator.clipboard.writeText(
      `https://shortify.in/${url?.short_url}`
    );

    return copiedText;
  };

  const downloadQr = () => {
    const qrUrl = url?.qr;
    const fileName = url?.title;

    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  const { loading: deleteLoading, fn: deleteFn } = useFetch(deleteUrl, url.id);

  return (
    <div className="flex gap-4 flex-col md:flex-row border rounded-lg p-2 my-3">
      <img src={url?.qr} alt="qr code" className="h-36 object-contain" />
      <Link to={`/link/${url?.id}`} className="flex flex-col">
        <span className="text-2xl font-bold hover:underline cursor-pointer">
          {url?.title}
        </span>
        <span className="text-xl font-bold text-blue-500 hover:underline cursor-pointer">
          https://shortify.in/
          {url?.custom_url ? url?.custom_url : url?.short_url}
        </span>
        <span className="text-md hover:underline cursor-pointer">
          {url?.original_url}
        </span>
        <span className="flex items-end text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2">
        <Button onClick={copyUrl} variant="ghost">
          <Copy />
        </Button>
        <Button onClick={downloadQr} variant="ghost">
          <Download />
        </Button>
        <Button
          onClick={() => deleteFn().then(() => fetchUrls())}
          variant="ghost"
        >
          {deleteLoading ? <BeatLoader /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default UrlCard;
