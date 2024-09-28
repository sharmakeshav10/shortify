import Error from "@/components/Error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import UrlCard from "@/components/UrlCard";
import { UserState } from "@/context";
import { getUrlsClicks } from "@/db/apiClicks";
import { getUrls } from "@/db/apiUrls";
import useFetch from "@/hooks/useFetch";
import { FilterIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const DashboardPage = () => {
  const [search, setSearch] = useState("");

  const { data } = UserState();

  const {
    loading: loadUrls,
    data: urls,
    error,
    fn: urlsFn,
  } = useFetch(getUrls, data.id);
  const {
    loading: loadClicks,
    data: clicks,
    fn: clicksFn,
  } = useFetch(
    getUrlsClicks,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    urlsFn();
  }, []);

  useEffect(() => {
    if (urls?.length) {
      clicksFn();
    }
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) =>
    url?.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {loadUrls || loadClicks ? (
        <BarLoader width={"100%"} />
      ) : (
        <div className="mt-8">
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardHeader>
                <CardTitle>Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">{urls?.length}</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Clicks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">{clicks?.length}</CardContent>
            </Card>
          </div>

          <div className="mt-6 flex justify-between">
            <h2 className="text-3xl font-bold">My Links</h2>
            <Button>Create Link</Button>
          </div>

          <div className="relative my-4">
            <Input value={search} onChange={(e) => setSearch(e.target.value)} />
            <FilterIcon className="absolute right-2 top-2" />
          </div>
          {error && <Error message={error.message} />}
          {(filteredUrls || []).map((url, idx) => {
            return <UrlCard key={idx} url={url} fetchUrls={urlsFn} />;
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
