# Procore JS SDK Endpoints

Generates typescript wrapper functions and interface definitions for the procore
API.

## Install

```
yarn add node-procore-endpoints
```

## Usage

```bash
node-procore-endpoints lib/endpoints
```

## Example

```typescript
interface DirectCosts {
  action: string;
  qs?: any;
  id?: number;
  project_id: number;
}

function directCosts({ action, qs, id, project_id  }: DirectCosts): any {
  return {
    base: '/vapid/projects/{project_id}/direct_costs',
    action,
    params: { id, project_id  },
    qs
  }
}

export default directCosts
```

## File Structure

```
lib/endpoints
├── accident-logs.ts
├── authentication.ts
├── bids.ts
├── budget-line-items.ts
├── budget-modifications.ts
├── calendar-events.ts
├── call-logs.ts
├── change-events.ts
├── change-order-change-reasons.ts
├── change-order-packages.ts
├── change-order-requests.ts
├── change-orders.ts
├── change-types.ts
├── checklists.ts
├── communications.ts
├── companies.ts
├── company-folders-and-files.ts
├── company-insurances.ts
├── company-offices.ts
├── company-users.ts
├── company-vendor-insurances.ts
├── company-vendors.ts
├── contract-payments.ts
├── cost-codes.ts
├── daily-construction-report-logs.ts
├── dashboards.ts
├── delivery-logs.ts
├── departments.ts
├── direct-costs.ts
├── draw-requests.ts
├── drawings.ts
├── dumpster-logs.ts
├── equipment-logs.ts
├── equipment.ts
├── image-categories.ts
├── images.ts
├── inspection-logs.ts
├── line-item-types.ts
├── locations.ts
├── manpower-logs.ts
├── markup-attachments.ts
├── markup-layer-elements.ts
├── markup-layers.ts
├── me.ts
├── meetings.ts
├── notes-logs.ts
├── observations.ts
├── permission-templates.ts
├── permissions.ts
├── plan-revision-logs.ts
├── potential-change-orders.ts
├── prime-contracts.ts
├── productivity-logs.ts
├── programs.ts
├── project-configuration.ts
├── project-dates.ts
├── project-folders-and-files.ts
├── project-insurances.ts
├── project-roles.ts
├── project-stages.ts
├── project-templates.ts
├── project-tools.ts
├── project-types.ts
├── project-users.ts
├── project-vendor-insurances.ts
├── project-vendors.ts
├── projects.ts
├── punch-item-assignments.ts
├── punch-item-types.ts
├── punch-items.ts
├── punch-list-assignee-options.ts
├── purchase-order-contracts.ts
├── quantity-logs.ts
├── reports.ts
├── requested-changes.ts
├── resources.ts
├── rfi-replies.ts
├── rfis.ts
├── rfqs.ts
├── safety-violation-logs.ts
├── schedule-integration.ts
├── schedule-type.ts
├── specification-section-divisions.ts
├── specification-section-revisions.ts
├── specification-sections.ts
├── specification-sets.ts
├── specification-uploads.ts
├── sticky-filters.ts
├── sub-jobs.ts
├── submittals.ts
├── tasks.ts
├── timecard-entries.ts
├── timecards.ts
├── todos.ts
├── toolfavorites.ts
├── trades.ts
├── transmittals.ts
├── user-access-level.ts
├── waste-logs.ts
├── weather-logs.ts
├── work-logs.ts
└── work-order-contracts.ts
```
