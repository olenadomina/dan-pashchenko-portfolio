import { useEffect } from 'react';
import './WorkSpace.css';
import Typographic from './Typographic.jsx';

const projects = [
  {
    id: 'kuni', name: 'KUNI Cam', category: 'Photo & video', icon: 'kuni.png',
    description: 'Photo and video editing with an analog feel. I established the technical foundation and implemented around 90% of the product over two years.',
    tags: ['iOS', 'Image processing', 'Video'],
    url: 'https://apps.apple.com/us/app/kuni-cam-photo-video-editor/id1336488891',
    images: [
      { src: 'kuni-preview-1.webp', width: 1242, height: 2688, alt: 'KUNI Cam film grain and dust effects on a skateboard photograph', caption: 'Film textures & effects' },
      { src: 'kuni-preview-2.webp', width: 1242, height: 2688, alt: 'KUNI Cam custom photo presets applied to a food photograph', caption: 'Custom photo presets' }
    ]
  },
  {
    id: 'papaya', name: 'Papaya for HS', category: 'Health & wellbeing', icon: 'papaya.png',
    description: 'A companion for managing hidradenitis suppurativa. I took an existing MVP into production and delivered 28 App Store releases.',
    tags: ['Swift', 'SwiftUI', 'iOS'],
    url: 'https://apps.apple.com/us/app/papaya-for-hs/id1633481278',
    images: [
      { src: 'papaya-preview-1.webp', width: 1290, height: 2796, alt: 'Papaya journal calendar with symptom and treatment entries', caption: 'Daily health journal' },
      { src: 'papaya-preview-2.webp', width: 1290, height: 2796, alt: 'Papaya symptom entry with pain severity and notes', caption: 'Symptom tracking' }
    ]
  },
  {
    id: 'athleats', name: 'Athleats', category: 'Nutrition & performance', icon: 'athleats.png',
    description: 'Performance recipes, meal planning and macro tracking, all in one app.',
    tags: ['Recipes', 'Meal planning', 'Macro tracking'],
    url: 'https://apps.apple.com/ua/app/athleats-performance-recipes/id6754655851',
    images: [
      { src: 'athleats-preview-1.webp', width: 1284, height: 2778, screen: { x: 225, y: 744, width: 832, height: 1806 }, alt: 'Athleats Greek meatball bowl recipe with macros and nutrition', caption: 'Recipes & nutrition' },
      { src: 'athleats-preview-2.webp', width: 1284, height: 2778, screen: { x: 225, y: 744, width: 832, height: 1806 }, alt: 'Athleats saved recipe collections for workouts and everyday meals', caption: 'Personal recipe collections' }
    ]
  }
];

function WorkspaceIcon({ type = 'project' }) {
  const paths = {
    project: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h5M8 16h7" /></>,
    folder: <path d="M3 7a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />,
    preview: <><rect x="5" y="2" width="14" height="20" rx="3" /><path d="M10 5h4M10 19h4" /></>,
    arrow: <path d="M5 19 19 5M5 5h14v14" />,
    chevron: <path d="m9 5 7 7-7 7" />,
    split: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16" /></>
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>;
}

function AppPreview({ image }) {
  const screen = image.screen;
  return <div className={`workspace-device${screen ? ' workspace-device-cropped' : ''}`}>
    {screen ? <div className="workspace-screen" style={{ aspectRatio: `${screen.width} / ${screen.height}` }}>
      <img src={`/images/${image.src}`} width={image.width} height={image.height} alt={image.alt} loading="lazy" decoding="async" style={{ width: `${image.width / screen.width * 100}%`, left: `${-screen.x / screen.width * 100}%`, top: `${-screen.y / screen.height * 100}%` }} />
    </div> : <img src={`/images/${image.src}`} width={image.width} height={image.height} alt={image.alt} loading="lazy" decoding="async" />}
  </div>;
}

export default function WorkSpace() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (projects.some(project => project.id === id)) {
      document.getElementById(id)?.scrollIntoView({ block: 'start' });
    }
  }, []);

  return <Typographic><section id="work" className="work-section workspace-section" aria-labelledby="work-title">
    <div className="section-heading">
      <div><p className="eyebrow section-label">SELECTED WORK</p><h2 id="work-title">Built for real life.</h2></div>
      <p className="section-intro">A few apps I’ve helped bring into people’s everyday lives.</p>
    </div>

    <div className="workspace-projects">
      {projects.map(project => <article key={project.id} id={project.id} className="workspace-window" aria-labelledby={`title-${project.id}`}>
        <header className="workspace-toolbar">
          <div className="workspace-window-dots" aria-hidden="true"><i /><i /><i /></div>
          <span className="workspace-title"><WorkspaceIcon type="folder" />{project.name}<span className="workspace-extension">.xcodeproj</span></span>
          <span className="workspace-platform"><WorkspaceIcon type="preview" />iOS</span>
        </header>
        <div className="workspace-panel">
          <div className="workspace-overview">
            <div className="workspace-copy">
              <p className="workspace-comment">// {project.category}</p>
              <img className="workspace-app-icon" src={`/images/${project.icon}`} width="56" height="56" alt="" />
              <h3 id={`title-${project.id}`}>{project.name}</h3>
              <p className="workspace-description">{project.description}</p>
              <ul className="workspace-tags" aria-label={`${project.name} focus`}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
            </div>
            <a className="workspace-store-link" href={project.url} target="_blank" rel="noreferrer" aria-label={`Download ${project.name} on the App Store`}><img src="/images/download-on-the-app-store.svg" width="144" height="48" alt="Download on the App Store" /></a>
          </div>
          <div className={`workspace-previews workspace-previews-${project.id}`}>
            <div className="workspace-preview-heading"><WorkspaceIcon type="preview" /><span>App previews</span><span className="workspace-preview-device">iPhone</span></div>
            <div className="workspace-preview-images">{project.images.map(image => <figure key={image.src}>
              <AppPreview image={image} />
              <figcaption>{image.caption}</figcaption>
            </figure>)}</div>
          </div>
        </div>
      </article>)}
    </div>
  </section></Typographic>;
}
