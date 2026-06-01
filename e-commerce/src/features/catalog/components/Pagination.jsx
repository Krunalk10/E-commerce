import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { useCatalogStore } from '../store/useCatalogStore'

export function Pagination({ meta }) {
  const setPage = useCatalogStore((state) => state.setPage)

  if (meta.totalPages <= 1) {
    return null
  }

  return (
    <div className="pagination">
      <Button
        disabled={meta.page <= 1}
        icon={ChevronLeft}
        onClick={() => setPage(meta.page - 1)}
        variant="secondary"
      >
        Previous
      </Button>

      <div className="pagination__pages" aria-label="Pagination">
        {Array.from({ length: meta.totalPages }, (_, index) => index + 1).map((page) => (
          <button
            aria-current={meta.page === page ? 'page' : undefined}
            className={meta.page === page ? 'is-active' : undefined}
            key={page}
            onClick={() => setPage(page)}
            type="button"
          >
            {page}
          </button>
        ))}
      </div>

      <Button
        disabled={meta.page >= meta.totalPages}
        icon={ChevronRight}
        onClick={() => setPage(meta.page + 1)}
        variant="secondary"
      >
        Next
      </Button>
    </div>
  )
}
