import TeamCard from "@/components/TeamCard";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { Team } from "@/types";

const Team = () => {
  const teamIndex: Team = getListPage("team/_index.md");
  const teams: Team[] = getSinglePage("team");
  const { title, meta_title, description, image } = teamIndex.frontmatter;
  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} />
      <section className="section-sm pb-0">
        <div className="container">
          <div className="row justify-center">
            {teams.map((author: Team, index: number) => (
              <div className="mb-14 md:col-6 lg:col-3" key={index}>
                <TeamCard data={author} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
