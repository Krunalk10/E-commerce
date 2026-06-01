import { SlidersHorizontal, X } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { useCatalogStore } from '../store/useCatalogStore'

function CheckboxGroup({ items, label, selectedValues, storeKey }) {
  const toggleArrayFilter = useCatalogStore((state) => state.toggleArrayFilter)

  return (
    <fieldset className="filter-group">
      <legend>{label}</legend>
      {items.map((item) => (
        <label key={item.id}>
          <input
            checked={selectedValues.includes(item.id)}
            onChange={() => toggleArrayFilter(storeKey, item.id)}
            type="checkbox"
          />
          <span>{item.label ?? item.name}</span>
        </label>
      ))}
    </fieldset>
  )
}

export function FilterPanel({ options }) {
  const filters = useCatalogStore((state) => state.filters)
  const resetFilters = useCatalogStore((state) => state.resetFilters)
  const setFilter = useCatalogStore((state) => state.setFilter)

  if (!options) {
    return null
  }

  return (
    <aside className="filter-panel">
      <div className="filter-panel__header">
        <span>
          <SlidersHorizontal aria-hidden="true" size={18} />
          Filters
        </span>
        <Button icon={X} onClick={resetFilters} variant="ghost">
          Reset
        </Button>
      </div>

      <CheckboxGroup
        items={options.brands}
        label="Brand"
        selectedValues={filters.brands}
        storeKey="brands"
      />
      <CheckboxGroup
        items={options.watchTypes}
        label="Movement type"
        selectedValues={filters.types}
        storeKey="types"
      />

      <fieldset className="filter-group">
        <legend>Price</legend>
        {options.priceRanges.map((range) => (
          <label key={range.id}>
            <input
              checked={filters.priceRange === range.id}
              name="priceRange"
              onChange={() => setFilter('priceRange', range.id)}
              type="radio"
            />
            <span>{range.label}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="filter-group">
        <legend>Case size</legend>
        {options.caseSizes.map((range) => (
          <label key={range.id}>
            <input
              checked={filters.caseSize === range.id}
              name="caseSize"
              onChange={() => setFilter('caseSize', range.id)}
              type="radio"
            />
            <span>{range.label}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="filter-group">
        <legend>Availability</legend>
        <label>
          <input
            checked={filters.inStockOnly}
            onChange={(event) => setFilter('inStockOnly', event.target.checked)}
            type="checkbox"
          />
          <span>In stock only</span>
        </label>
      </fieldset>
    </aside>
  )
}
