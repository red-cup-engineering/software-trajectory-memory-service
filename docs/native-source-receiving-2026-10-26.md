# Native source receiving — 2026-10-26

The exact memory source and its declared runtime provider graph were admitted
through the original Node source-admission implementation. After a bounded
source-kind repair in the original materializer, its explicitly selected module
graph was materialized and the release catalog verified successfully. The full
export census still refuses an absent supplier target. Runtime loader binding,
service entrypoint receiving and activation remain outstanding; nothing was
published or activated. One bounded consumer import and native journal round trip
also succeeded from the materialized release with an explicit external loader.

## Immutable inputs and successful source admission

| Input or result | Identity |
| --- | --- |
| Package | `@red-cup-engineering/software-trajectory-memory-service@1.0.5` |
| Source commit | `49489f30e5e3fd0f9782d1f5f4cc167e56d7dfbc` |
| Package tree; package path | `59d87ba2cf28097115a3b4e974b070a1ca0b07a4`; repository root |
| Original manifest blob | `2c73c9fcd16c9e8b8e8c58c80d24873b7b60b726` |
| Admitted source archive SHA-256 | `6ca8d27fd78950b30623df402f47401a1245de4168ccde404421442cc59ca5f2` |
| Admitted source archive integrity | `sha512-flA6OdhJEXbGpZ/tHWmapF7AwaiCL8bj+qCXyS8ffK59IKp3Sl4Go8HqTBB28n11EpQe34UF6ek73kmyoQ30uA==` |
| Provider catalog SHA-256 for this receiving run | `1f818983b2dd8d0c8dcfa1d4b7de64db7e48b4af5cdc0b4054c483a702e2d381` |

[The committed source](https://github.com/red-cup-engineering/software-trajectory-memory-service/tree/49489f30e5e3fd0f9782d1f5f4cc167e56d7dfbc)
was received as its original commit, 21 original tree objects and 20 original
blobs. Connector-returned object identities and source bytes were checked by
recomputing every canonical Git object hash. GitHub's normalized timestamp
representation was serialized with the original `-0500` headers, accepted only
when the entire commit hash matched. No replacement commit was authored. Parent
history was not received or claimed; all current-source objects were present.

The original source directory, manifest, `private: true`, source files and
dependency declarations were unchanged. Native importer lookup and the committed
lock selected **27 runtime nodes, including the root, backed by 20 unique
archives**. Nested provider placements were retained. The 26 dependency nodes'
original tarballs were read through npm's `cacache` API and independently checked
against their lockfile SHA-512 integrity. Development-only `tsx` was not promoted
into the package's declared runtime dependencies.

The source-admission API was
`formIndependentNodeRuntimeProviderCatalog({ entries, admissions, outputDirectory })`
from the [original materializer source at
`f388f43eda0421bd4c868c58425c8e977a0486ae`](https://github.com/red-cup-engineering/node-runtime-materialization-engineering-services-section/blob/f388f43eda0421bd4c868c58425c8e977a0486ae/src/admit-independent-node-sources.mjs).
The executed module blob was `8f59dcba78bc4a4a191dd9ee78a3361754512262`;
its original tarball-reader sibling was `14a988ee537cb27154b236730bf64cbcc7416f12`.
This selected executable closure used real `semver@7.8.5` and
`npm-packlist@10.0.3`, installed without lifecycle execution. Its native tool lock
SHA-256 was `0711c48e158e860f6256a7d3594b4df6ac2fd8dca3e52c50fbec50e05dfee4e8`.
This was execution of the unchanged selected source API, not installation of
the entire source owner's workspace package.

The root admission supplied its actual Git repository directory, the commit and
tree above, `packagePath: ""`, and explicit dependency-location edges. Each
dependency node supplied its original name, version, integrity, received archive
and explicit edges. The original implementation validated the graph before
packing, then ran:

```sh
npm pack --ignore-scripts --offline --json --pack-destination <isolated-output>
```

Native package selection retained exactly `LICENSE`, `package.json`, `README.md`,
`src/client.mjs` and `src/memory.mjs`. Every packed member matched its original Git
blob, and the source was revalidated after packing. The resulting
`NodeRuntimeProviderCatalog` is evidence of exact source and provider admission.
Its recorded digest binds this run's path-bearing catalog; temporary absolute
paths are not a portable deployment configuration.

The first sandboxed attempt could not read a native npm child-process report.
The same unchanged command succeeded through the approved native diagnostic
execution route. No supplier, source check or pack result was substituted.

## Earlier published materializer refusals

The existing registry artifact
`@red-cup-engineering/node-runtime-release-materialization-service@0.11.1`
was received with git head `91c160c350fc439ac88619f392195dd8b35da3a7`, archive
SHA-256 `fd1c44672a1b04177a124af3238585cd46ff79048e3058b28f1b6db05dc8bec5`, and
integrity
`sha512-mk4vp1Oa6X9Cq3YoTOZrHzhLBM/DY6o09QE6iUN9G5XgK6JQiBm57DqEZhQYNWa1Eoxbd6716TeawyqL9QKZpw==`.
Its public `materializeNodeRuntimeProviderCatalog` and
`verifyNodeRuntimeReleaseCatalog` interfaces were used with genuine installed
`jsnode-engine@0.1.0` and `import-meta-resolve@4.2.0` providers.
The published archive exposes an older interface than current source despite
sharing the `0.11.1` version string; it does not export the newer independent
source-admission subpath.

1. **Complete export census refused:** the actual
   `@lenticule-science/articulating@0.2.0` archive declares
   `./deployments/eip155-5615610.json` but omits its target
   `./content/deployments/eip155-5615610.json`.
2. **Documented executable selection also refused:** with
   `dependencyExportPolicy: "runtime-imports"` and real entrypoints
   `src/client.mjs` and `src/memory.mjs`, the materializer reported
   `runtime.mjs:97:32: Expression expected`. Its parser wrapper labels an imported
   `.mts` carrier as `.mjs`. The exact
   `json-codec-service@0.1.3/src/json/jsonl/eavt/index.mts` bytes reproduce this
   failure under that label; the same original parser accepts those unchanged
   bytes under their actual `.mts` filename and reports eight module requests.

These earlier attempts did not reach an accepted release-catalog verification
result. Their source and provider identities remain distinct from the later
successful receiving below. No deployment JSON was invented or failed check
treated as a pass.

## Original-owner correction and successful module-graph receiving

The current materializer source retained the same filename-loss bug. Its
JavaScript facade intentionally rejects TypeScript, so correcting the filename
alone correctly exposed that separate provider boundary. The repair in the
original materializer selects the existing exact `jsnode-engine@0.1.0` dependency
for both runtime graph readers and passes each actual carrier filename. The
JavaScript facade and all supplier bytes remain unchanged.

The real parser artifact has source `gitHead`
`38de6f782cbdc24690c315845ef97463d9151b9c`, TypeScript `5.9.3`, and integrity
`sha512-2JRztbGeGVr5OW5pocTEixv+NEJY+4ByWGAVUVZOZ+cZ17ZUw1/LWK4PT92GB2LMT99UBtCGYexBVybpKpsFDw==`.
This is the same existing typed parser used by the published materializer above;
no parser implementation was created or relaxed.

The received materializer source is committed at
[`ce643565e84265684507b38f2aade4e1568cf196`](https://github.com/red-cup-engineering/node-runtime-materialization-engineering-services-section/commit/ce643565e84265684507b38f2aade4e1568cf196),
tree `9d32d1c60161e825305436e5d615f3715b000bc0`, based on
`f388f43eda0421bd4c868c58425c8e977a0486ae`. Its manifest and executable
module Git blobs are `d5600123dd54138fa210a851aa009a7c9e9492f2`
(`package.json`, version `0.11.2`), `4445f5059ee729ecf655103452b2e6de34ad628e`
(`materialize-release.mjs`), and `5b52c9d5f99012c5a5dda2cef132580d173bdf1b`
(`materialize-traced-node-runtime.mjs`). The original owner's complete native
suite passed **97 tests**, including typed root/transitive carriers and mandatory
missing-import refusals. The original workspace declarations were preserved;
the separate native receiving environment used an actual 161-package closure,
whose lock SHA-256 is
`5bb2b8d95f206b7dbb77acadbcbe25fef8ab0f3b16c0f875573398db06f52a70`.

Using the unchanged admitted memory catalog, the existing
`materializeNodeRuntimeProviderCatalog` API was called with
`dependencyExportPolicy: "runtime-imports"` and
`runtimeEntrypoints: ["src/client.mjs", "src/memory.mjs"]`.
`verifyNodeRuntimeReleaseCatalog` returned `ok: true`:

| Result | Identity or observation |
| --- | --- |
| Materialized runtime artifact digest | `37f13c145d7380826496683f07c9fb5dc6229e6529debf2947a17772a297bf48` |
| Release catalog digest | `d9145db5b3a47d7182fd1f398be2c7545a3dfb7bb8ac6717dfea7090e7c2700b` |
| File count / byte count | 851 / 5,764,378 |
| Unresolved imports, analysis limits, guarded unavailable imports, provider-selection violations | None in the selected graph |

The default strict invocation was also repeated and still refused the same
missing articulating deployment export. The selected graph does not import it.
The whole-export obstruction remains with its supplier owner; the runtime-import
selection does not waive it. Candidate version `0.11.2` was unoccupied in the
registry (HTTP 404) when selected; no materializer publication is claimed.

## Isolated execution with the explicit existing loader

The materialized release's actual `src/client.mjs` was imported under Node
`24.22.1` using `node --import` with the original receiving installation's
`tsx/dist/loader.mjs`. This was `tsx@4.20.6`, integrity
`sha512-ytQKuwgmrrkDTFP4LjR0ToE2nqgy886GpvRSpU0JAnrdBYppuY5rLkRUYPU1yCryb24SsKBTL/hlDQAEFVwtZg==`;
the loaded entry bytes had SHA-256
`0b1c5b86192772fe9257710e739959cee5947c11ae1f93b61abfaa9b80c6def1`.
Its selected original providers were `esbuild@0.25.12`,
`@esbuild/linux-x64@0.25.12`, `get-tsconfig@4.14.3`, and
`resolve-pkg-maps@1.0.0`, bound by the
[committed native lock](https://github.com/red-cup-engineering/software-trajectory-memory-service/blob/49489f30e5e3fd0f9782d1f5f4cc167e56d7dfbc/package-lock.json).
No loader/provider bytes were copied into or altered within the release.

The public `appendSoftwareMissionCheckpoint` operation wrote one explicitly
diagnostic checkpoint to a fresh isolated data root outside the immutable
release. `readSoftwareMissionCheckpoint` opened the real journal afresh and
returned exactly the submitted checkpoint. The native journal appended one
content record and four claims, returning
`ni:///sha-256;Ov1nlx4SaQ5fsqCFxmU00bxekfxQbnkoiP7wzzDhl7g`.
This probe contains no customer-acceptance or paid-work outcome claim.

`verifyNodeRuntimeReleaseCatalog` ran immediately before and after this operation.
Both observations were equal and successful, retaining the artifact and catalog
digests above. This receives one real local consumer operation from the
materialized bytes with an external loader. The production loader binding and
service activation remain separate obligations.

## Runtime and economic boundaries

The memory package's native behavioral receiving uses the explicit
`tsx@4.20.6` loader. Plain Node 24 imports of its transitive `.mts` dependency
inside `node_modules` fail before execution; source admission does not install a
production loader. The checked-in historical Docker/systemd paths reference an
obsolete, absent `bin/server.mjs`; they do not identify a received live entrypoint.
A real consumer must separately receive its loader, actual executable entrypoint,
provider binding, operating data and effects, then demonstrate activation.

The registry returned HTTP 404 for memory `1.0.5` during this receiving. There was
no publication, runtime activation, authenticated customer receipt, payment or
revenue claim. This document records completed source admission and selected
module-graph materialization with their precise downstream obligations; it is not
a substitute release manifest or evidence that the service is running.
