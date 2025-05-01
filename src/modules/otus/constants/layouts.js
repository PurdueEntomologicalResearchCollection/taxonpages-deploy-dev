import { DEFAULT_OVERVIEW_LAYOUT } from './layouts/index.js'

const panelEntries = Object.values(
  import.meta.glob(['../components/Panel/*/main.js', '#/panels/*/main.js'], {
    eager: true,
    import: 'default'
  })
)

const { taxa_page } = __APP_ENV__

const tabsLayout = Object.assign({
  ...DEFAULT_OVERVIEW_LAYOUT,
  ...taxa_page
})

function parsePanelConfiguration(panelLayout) {
  return panelLayout.map((row) =>
    row.map((col) =>
      col.map((panel) => {
        const isPanelKey = typeof panel === 'string'
        const panelObj = isPanelKey ? { id: panel } : { ...panel }
        const entry = panelEntries.find((item) => item.id === panelObj.id)

        return {
          ...entry,
          ...panelObj
        }
      })
    )
  )
}

const layouts = {}

for (const key in tabsLayout) {
  const tabLayout = tabsLayout[key]

  layouts[key] = {
    panels: parsePanelConfiguration(tabLayout?.panels || {}),
    rankGroup: tabLayout.rank_group || [],
    label: tabLayout.label
  }
}

export default layouts
