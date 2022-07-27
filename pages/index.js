import SmallCard from '../components/SmallCard';
import { projectIcons } from '../components/Icons';
import { projects } from '../utils/projectsData';
import Head from 'next/head';

const Home = () => (
  <div className="home">
    <h1>What Can I Deploy to Static Apps?</h1>
    <div className="card-grid">
      {projects.map((project) => {
        const Icon = projectIcons[project.id];
        return (<>
          <Head>
            <title> {project.name} </title>
            <meta name="description" content="plain description" />
            <meta name='og:title' content={"og title: " + project.name} />
            <meta name="og:description" content={"og description: " + project.slug} />
            <meta name="og:image" content={Icon} />
          </Head>

          <SmallCard
            key={project.id}
            Icon={Icon}
            title={project.name}
            slug={project.slug}
          />
        </>);
      })}
    </div>
  </div>
);

export default Home;
