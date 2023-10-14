import WorkCard from "@/components/WorkCard";
import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { getAllTaxonomy, getTaxonomy } from "@/lib/taxonomyParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader";
import WorkSidebar from "@/partials/WorkSidebar";
import SeoMeta from "@/partials/SeoMeta";
import { Work } from "@/types";
const { work_folder, pagination } = config.settings;

// for all regular pages
const Works = () => {
  const workIndex: Work = getListPage(`${work_folder}/_index.md`);
  const { title, meta_title, description, image } = workIndex.frontmatter;
  const works: Work[] = getSinglePage(work_folder);
  const allCategories = getAllTaxonomy(work_folder, "categories");
  const categories = getTaxonomy(work_folder, "categories");
  const tags = getTaxonomy(work_folder, "tags");
  const sortedWorks = sortByDate(works);
  const totalPages = Math.ceil(works.length / pagination);
  const currentWorks = sortedWorks.slice(0, pagination);

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={workIndex.frontmatter.title} />
      <section className="section">
        <div className="container">
          <div className="row gx-5">
            <div className="lg:col-12">
              <div className="row">
                {currentWorks.map((work: any, index: number) => (
                  <div key={index} className="mb-14 md:col-6">
                    <WorkCard data={work} />
                  </div>
                ))}
              </div>
              <Pagination
                section={work_folder}
                currentPage={1}
                totalPages={totalPages}
              />
            </div>

            {/* <WorkSidebar
              categories={categories}
              tags={tags}
              allCategories={allCategories}
            /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Works;
