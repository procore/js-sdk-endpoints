# Procore JS SDK Endpoints

Generates TypeScript wrapper functions and interface definitions for the Procore API.

## Install

```shell
yarn add -D @procore/js-sdk-endpoints
```

## Usage

```shell
node-procore-endpoints lib -i index.ts -d endpoints
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

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/procore/js-sdk-endpoints. This project is
intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the
[Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The package is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

## About Procore

<img
  src="https://www.procore.com/images/procore_logo.png"
  alt="Procore Logo"
  width="250px"
/>

Manage Version is maintained by Procore Technologies.

Procore - building the software that builds the world.

Learn more about the #1 most widely used construction management software at [procore.com](https://www.procore.com/)
