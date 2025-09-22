import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'You Are New',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Welcome to the world of Frontend programming! 🎉 If you're new, it's an exciting and creative journey. Frontend is where you turn ideas into vibrant user interfaces—where design meets technology.
      </>
    ),
  },
  {
    title: 'Is React Difficult?',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Learning React isn't too difficult, but it's not entirely easy either—it depends on your JavaScript background and how you approach learning.
      </>
    ),
  },
  {
    title: 'Salary & Potential',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Frontend programmers can receive a starting salary of 8-15 million/month in Vietnam, and higher if working remotely for foreign companies.

        When you have experience or know more about backend (Fullstack), the salary can be up to 25-40 million/month or more.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
