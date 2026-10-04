import React, { useState } from 'react'
import {
  Boxes,
  SlidersHorizontal,
  MoreHorizontal,
  Clock,
  ArrowRight,
  Plus,
  X
} from 'lucide-react'
import {
  Button,
  Badge,
  PageHeader,
  Panel,
  SearchBox,
  PostureRing
} from '../components/ui/AppUI'
import { projectsData } from '../data/appData'

export default function ProjectsPage() {
  const [projects, setProjects] = useState(projectsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [showNewModal, setShowNewModal] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [newProjectDesc, setNewProjectDesc] = useState('')

  const filtered = projects.filter(
    (p) =>
      p[0].toLowerCase().includes(searchTerm.toLowerCase()) ||
      p[1].toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateProject = (e) => {
    e.preventDefault()
    if (!newProjectName) return
    const newProj = [
      newProjectName,
      newProjectDesc || 'Custom application services',
      'Development',
      '80',
      '0',
      '1 target',
      'Just now'
    ]
    setProjects([...projects, newProj])
    setNewProjectName('')
    setNewProjectDesc('')
    setShowNewModal(false)
  }

  return (
    <>
      <PageHeader
        eyebrow="WORKSPACE"
        title="Projects"
        description="Organize API targets, scans and findings by product or application."
        action={
          <Button icon={Plus} onClick={() => setShowNewModal(true)}>
            New project
          </Button>
        }
      />

      <div className="filter-row">
        <SearchBox
          placeholder="Search projects"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="secondary" icon={SlidersHorizontal}>
          Filter
        </Button>
        <span className="result-count">{filtered.length} projects</span>
      </div>

      <div className="project-grid">
        {filtered.map(([name, desc, env, score, findings, coverage, scanned]) => (
          <Panel className="project-card enter" key={name}>
            <div className="project-card-top">
              <div className="project-icon">
                <Boxes size={19} />
              </div>
              <Badge tone={env === 'Production' ? 'warning' : 'neutral'}>
                {env}
              </Badge>
              <button className="icon-button" aria-label="Project actions">
                <MoreHorizontal size={17} />
              </button>
            </div>

            <div className="project-name">{name}</div>
            <div className="project-desc">{desc}</div>

            <div className="project-score">
              <PostureRing value={Number(score)} />
              <div>
                <small>SECURITY SCORE</small>
                <strong>
                  {score}
                  <span>/100</span>
                </strong>
              </div>
            </div>

            <div className="project-meta">
              <div>
                <strong>{coverage}</strong>
                <span>API coverage</span>
              </div>
              <div>
                <strong>{findings}</strong>
                <span>Open findings</span>
              </div>
            </div>

            <div className="project-footer">
              <span>
                <Clock size={14} /> Scanned {scanned}
              </span>
              <ArrowRight size={16} />
            </div>
          </Panel>
        ))}

        <button
          className="new-project-card"
          onClick={() => setShowNewModal(true)}
        >
          <span>
            <Plus size={22} />
          </span>
          <strong>Create new project</strong>
          <small>Group targets and security assessments</small>
        </button>
      </div>

      {/* New Project Modal */}
      {showNewModal && (
        <div className="modal-backdrop" onClick={() => setShowNewModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title">Create new project</div>
                <div className="modal-subtitle">
                  Group API services, repositories and targets.
                </div>
              </div>
              <button
                className="icon-button"
                onClick={() => setShowNewModal(false)}
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateProject} className="form-grid">
              <label className="field full">
                <span>Project Name</span>
                <input
                  placeholder="e.g. Identity & Access Service"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  autoFocus
                />
              </label>
              <label className="field full">
                <span>Description</span>
                <input
                  placeholder="e.g. Authentication and user token APIs"
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                />
              </label>
              <div className="modal-footer" style={{ width: '100%', marginTop: 14 }}>
                <Button variant="ghost" onClick={() => setShowNewModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Project</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
