## Tecnologías

- **Next.js 15** (App Router, Server Actions)
- **Prisma ORM** con proveedor MySQL
- **MySQL** (via Docker)

## Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Levantar MySQL con Docker

```bash
docker run -d --name real_inventado -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=realInventado_db -p 3306:3306 mysql:8
```

# Comprobar que corre el contenedor

```bash
  docker exec -it real_inventado mysql -u root -p
  password
  SHOW DATABASES;
  exit
```

### 3. Configurar el archivo `.env`

```env
DATABASE_URL="mysql://root:password@localhost:3306/realInventado_db"
```

### 4. Generar cliente Prisma y crear tablas

```bash
npx prisma generate
npx prisma db push
```

### 5. Poblar la base de datos con datos con categorias

```bash
npm run seed
```

### 6. Iniciar el servidor

```bash
npm run dev
```

```


```

Real-o-Inventado
├─ .env
├─ .next
│ └─ dev
│ ├─ build
│ │ ├─ chunks
│ │ │ ├─ [root-of-the-server]**51225daf.\_.js
│ │ │ ├─ [root-of-the-server]**51225daf._.js.map
│ │ │ ├─ [root-of-the-server]\_\_974941ed._.js
│ │ │ ├─ [root-of-the-server]**974941ed._.js.map
│ │ │ ├─ [turbopack-node]\_transforms_postcss_ts_6920245c._.js
│ │ │ ├─ [turbopack-node]_transforms_postcss_ts_6920245c._.js.map
│ │ │ ├─ [turbopack]\_runtime.js
│ │ │ └─ [turbopack]\_runtime.js.map
│ │ ├─ package.json
│ │ ├─ postcss.js
│ │ └─ postcss.js.map
│ ├─ build-manifest.json
│ ├─ cache
│ │ ├─ .rscinfo
│ │ ├─ next-devtools-config.json
│ │ └─ turbopack
│ │ └─ 8227f85d
│ │ ├─ 00000003.sst
│ │  
│ │ ├─ 00000776.meta
│ │ ├─ CURRENT
│ │ └─ LOG
│ ├─ fallback-build-manifest.json
│ ├─ lock
│ ├─ logs
│ │ └─ next-development.log
│ ├─ package.json
│ ├─ prerender-manifest.json
│ ├─ routes-manifest.json
│ ├─ server
│ │ ├─ app
│ │ │ ├─ \_not-found
│ │ │ │ ├─ page
│ │ │ │ │ ├─ app-paths-manifest.json
│ │ │ │ │ ├─ build-manifest.json
│ │ │ │ │ ├─ next-font-manifest.json
│ │ │ │ │ ├─ react-loadable-manifest.json
│ │ │ │ │ └─ server-reference-manifest.json
│ │ │ │ ├─ page.js
│ │ │ │ ├─ page.js.map
│ │ │ │ └─ page_client-reference-manifest.js
│ │ │ ├─ api
│ │ │ │ ├─ [...nextauth]
│ │ │ │ │ ├─ route
│ │ │ │ │ │ ├─ app-paths-manifest.json
│ │ │ │ │ │ ├─ build-manifest.json
│ │ │ │ │ │ └─ server-reference-manifest.json
│ │ │ │ │ ├─ route.js
│ │ │ │ │ ├─ route.js.map
│ │ │ │ │ └─ route_client-reference-manifest.js
│ │ │ │ └─ registro
│ │ │ │ ├─ route
│ │ │ │ │ ├─ app-paths-manifest.json
│ │ │ │ │ ├─ build-manifest.json
│ │ │ │ │ └─ server-reference-manifest.json
│ │ │ │ ├─ route.js
│ │ │ │ ├─ route.js.map
│ │ │ │ └─ route_client-reference-manifest.js
│ │ │ ├─ gestion
│ │ │ │ ├─ nueva
│ │ │ │ │ ├─ page
│ │ │ │ │ │ ├─ app-paths-manifest.json
│ │ │ │ │ │ ├─ build-manifest.json
│ │ │ │ │ │ ├─ next-font-manifest.json
│ │ │ │ │ │ ├─ react-loadable-manifest.json
│ │ │ │ │ │ └─ server-reference-manifest.json
│ │ │ │ │ ├─ page.js
│ │ │ │ │ ├─ page.js.map
│ │ │ │ │ └─ page_client-reference-manifest.js
│ │ │ │ ├─ page
│ │ │ │ │ ├─ app-paths-manifest.json
│ │ │ │ │ ├─ build-manifest.json
│ │ │ │ │ ├─ next-font-manifest.json
│ │ │ │ │ ├─ react-loadable-manifest.json
│ │ │ │ │ └─ server-reference-manifest.json
│ │ │ │ ├─ page.js
│ │ │ │ ├─ page.js.map
│ │ │ │ └─ page_client-reference-manifest.js
│ │ │ ├─ jugar
│ │ │ │ ├─ page
│ │ │ │ │ ├─ app-paths-manifest.json
│ │ │ │ │ ├─ build-manifest.json
│ │ │ │ │ ├─ next-font-manifest.json
│ │ │ │ │ ├─ react-loadable-manifest.json
│ │ │ │ │ └─ server-reference-manifest.json
│ │ │ │ ├─ page.js
│ │ │ │ ├─ page.js.map
│ │ │ │ └─ page_client-reference-manifest.js
│ │ │ ├─ page
│ │ │ │ ├─ app-paths-manifest.json
│ │ │ │ ├─ build-manifest.json
│ │ │ │ ├─ next-font-manifest.json
│ │ │ │ ├─ react-loadable-manifest.json
│ │ │ │ └─ server-reference-manifest.json
│ │ │ ├─ page.js
│ │ │ ├─ page.js.map
│ │ │ ├─ page_client-reference-manifest.js
│ │ │ ├─ perfil
│ │ │ │ ├─ page
│ │ │ │ │ ├─ app-paths-manifest.json
│ │ │ │ │ ├─ build-manifest.json
│ │ │ │ │ ├─ next-font-manifest.json
│ │ │ │ │ ├─ react-loadable-manifest.json
│ │ │ │ │ └─ server-reference-manifest.json
│ │ │ │ ├─ page.js
│ │ │ │ ├─ page.js.map
│ │ │ │ └─ page_client-reference-manifest.js
│ │ │ ├─ records
│ │ │ │ ├─ page
│ │ │ │ │ ├─ app-paths-manifest.json
│ │ │ │ │ ├─ build-manifest.json
│ │ │ │ │ ├─ next-font-manifest.json
│ │ │ │ │ ├─ react-loadable-manifest.json
│ │ │ │ │ └─ server-reference-manifest.json
│ │ │ │ ├─ page.js
│ │ │ │ ├─ page.js.map
│ │ │ │ └─ page_client-reference-manifest.js
│ │ │ ├─ registro
│ │ │ │ ├─ page
│ │ │ │ │ ├─ app-paths-manifest.json
│ │ │ │ │ ├─ build-manifest.json
│ │ │ │ │ ├─ next-font-manifest.json
│ │ │ │ │ ├─ react-loadable-manifest.json
│ │ │ │ │ └─ server-reference-manifest.json
│ │ │ │ ├─ page.js
│ │ │ │ ├─ page.js.map
│ │ │ │ └─ page_client-reference-manifest.js
│ │ │ ├─ resultado
│ │ │ │ ├─ acierto
│ │ │ │ │ ├─ page
│ │ │ │ │ │ ├─ app-paths-manifest.json
│ │ │ │ │ │ ├─ build-manifest.json
│ │ │ │ │ │ ├─ next-font-manifest.json
│ │ │ │ │ │ ├─ react-loadable-manifest.json
│ │ │ │ │ │ └─ server-reference-manifest.json
│ │ │ │ │ ├─ page.js
│ │ │ │ │ ├─ page.js.map
│ │ │ │ │ └─ page_client-reference-manifest.js
│ │ │ │ └─ fallo
│ │ │ │ ├─ page
│ │ │ │ │ ├─ app-paths-manifest.json
│ │ │ │ │ ├─ build-manifest.json
│ │ │ │ │ ├─ next-font-manifest.json
│ │ │ │ │ ├─ react-loadable-manifest.json
│ │ │ │ │ └─ server-reference-manifest.json
│ │ │ │ ├─ page.js
│ │ │ │ ├─ page.js.map
│ │ │ │ └─ page_client-reference-manifest.js
│ │ │ └─ temas
│ │ │ ├─ page
│ │ │ │ ├─ app-paths-manifest.json
│ │ │ │ ├─ build-manifest.json
│ │ │ │ ├─ next-font-manifest.json
│ │ │ │ ├─ react-loadable-manifest.json
│ │ │ │ └─ server-reference-manifest.json
│ │ │ ├─ page.js
│ │ │ ├─ page.js.map
│ │ │ └─ page_client-reference-manifest.js
│ │ ├─ app-paths-manifest.json
│ │ ├─ chunks
│ │ │ ├─ [root-of-the-server]**23fcfecf._.js
│ │ │ ├─ [root-of-the-server]\_\_23fcfecf._.js.map
│ │ │ ├─ [root-of-the-server]**5187b91b.\_.js
│ │ │ ├─ [root-of-the-server]**5187b91b._.js.map
│ │ │ ├─ [root-of-the-server]\_\_80d80fd9._.js
│ │ │ ├─ [root-of-the-server]**80d80fd9.\_.js.map
│ │ │ ├─ [root-of-the-server]**8208dc94._.js
│ │ │ ├─ [root-of-the-server]\_\_8208dc94._.js.map
│ │ │ ├─ [root-of-the-server]**85182ec5.\_.js
│ │ │ ├─ [root-of-the-server]**85182ec5._.js.map
│ │ │ ├─ [root-of-the-server]\_\_a1df87bf._.js
│ │ │ ├─ [root-of-the-server]**a1df87bf._.js.map
│ │ │ ├─ [turbopack]\_runtime.js
│ │ │ ├─ [turbopack]\_runtime.js.map
│ │ │ ├─ \_next-internal_server_app_api_[\_**nextauth]_route_actions_5ee2e7c1.js
│ │ │ ├─ \_next-internal_server_app_api_[___nextauth]_route_actions_5ee2e7c1.js.map
│ │ │ ├─ \_next-internal_server_app_api_registro_route_actions_8f23ca6b.js
│ │ │ ├─ \_next-internal_server_app_api_registro_route_actions_8f23ca6b.js.map
│ │ │ └─ ssr
│ │ │ ├─ [externals]\_\_e6a4d965._.js
│ │ │ ├─ [externals]**e6a4d965.\_.js.map
│ │ │ ├─ [externals]**e8a2741f._.js
│ │ │ ├─ [externals]\_\_e8a2741f._.js.map
│ │ │ ├─ [externals]_next_dist_1aaf5479._.js
│ │ │ ├─ [externals]_next_dist_1aaf5479._.js.map
│ │ │ ├─ [externals]_next_dist_c80f7c8f._.js
│ │ │ ├─ [externals]_next_dist_c80f7c8f._.js.map
│ │ │ ├─ [externals]_next_dist_compiled_next-server_app-page-turbo_runtime_dev_062c5159.js
│ │ │ ├─ [externals]\_next_dist_compiled_next-server_app-page-turbo_runtime_dev_062c5159.js.map
│ │ │ ├─ [externals]\_next_dist_shared_lib_no-fallback-error_external_59b92b38.js
│ │ │ ├─ [externals]\_next_dist_shared_lib_no-fallback-error_external_59b92b38.js.map
│ │ │ ├─ [root-of-the-server]\_\_09685a75._.js
│ │ │ ├─ [root-of-the-server]**09685a75.\_.js.map
│ │ │ ├─ [root-of-the-server]**143646e9._.js
│ │ │ ├─ [root-of-the-server]\_\_143646e9._.js.map
│ │ │ ├─ [root-of-the-server]**c982ecd6.\_.js.map
│ │ │ ├─ [root-of-the-server]**df1a66db._.js
│ │ │ ├─ [root-of-the-server]\_\_df1a66db._.js.map
│ │ │ ├─ [root-of-the-server]**efcd79bc.\_.js
│ │ │ ├─ [root-of-the-server]**efcd79bc._.js.map
│ │ │ ├─ [turbopack]\_runtime.js
│ │ │ ├─ [turbopack]\_runtime.js.map
│ │ │ ├─ \_5ef4abb2._.js
│ │ │ ├─ _5ef4abb2._.js.map
│ │ │ ├─ _da47234a._.js
│ │ │ ├─ _da47234a._.js.map
│ │ │ ├─ _next-internal_server_app\_\_not-found_page_actions_554ec2bf.js
│ │ │  
│ │ │ ├─ \_next-internal_server_app_temas_page_actions_863b2f23.js
│ │ │ ├─ \_next-internal_server_app_temas_page_actions_863b2f23.js.map
│ │ │ ├─ src_app_5b2047f8._.js
│ │ │ ├─ src*app_5b2047f8.*.js.map
│ │ │ ├─ src*app_bd40b36a.*.js
│ │ │ ├─ src*app_bd40b36a.*.js.map
│ │ │ ├─ src*app_components_AppHeader_tsx_aa53b3b5.*.js
│ │ │ └─ src*app_components_AppHeader_tsx_aa53b3b5.*.js.map
│ │ ├─ edge
│ │ │ └─ chunks
│ │ │ ├─ [root-of-the-server]**1a708e0d.\_.js
│ │ │ ├─ [root-of-the-server]**1a708e0d._.js.map
│ │ │ ├─ [root-of-the-server]\_\_8978dbac._.js
│ │ │ └─ [root-of-the-server]**8978dbac._.js.map
│ │ ├─ interception-route-rewrite-manifest.js
│ │ ├─ middleware
│ │ │ └─ middleware-manifest.json
│ │ ├─ middleware-build-manifest.js
│ │ ├─ middleware-manifest.json
│ │ ├─ middleware.js
│ │ ├─ middleware.js.map
│ │ ├─ next-font-manifest.js
│ │ ├─ next-font-manifest.json
│ │ ├─ pages
│ │ │ ├─ \_app
│ │ │ │ ├─ build-manifest.json
│ │ │ │ ├─ client-build-manifest.json
│ │ │ │ ├─ next-font-manifest.json
│ │ │ │ ├─ pages-manifest.json
│ │ │ │ └─ react-loadable-manifest.json
│ │ │ ├─ \_app.js
│ │ │ ├─ \_app.js.map
│ │ │ ├─ \_document
│ │ │ │ ├─ next-font-manifest.json
│ │ │ │ ├─ pages-manifest.json
│ │ │ │ └─ react-loadable-manifest.json
│ │ │ ├─ \_document.js
│ │ │ ├─ \_document.js.map
│ │ │ ├─ \_error
│ │ │ │ ├─ build-manifest.json
│ │ │ │ ├─ client-build-manifest.json
│ │ │ │ ├─ next-font-manifest.json
│ │ │ │ ├─ pages-manifest.json
│ │ │ │ └─ react-loadable-manifest.json
│ │ │ ├─ \_error.js
│ │ │ └─ \_error.js.map
│ │ ├─ pages-manifest.json
│ │ ├─ server-reference-manifest.js
│ │ └─ server-reference-manifest.json
│ ├─ static
│ │ ├─ chunks
│ │ │ ├─ [next]\_entry_page-loader_ts_43b523b5._.js
│ │ │ ├─ [next]_entry_page-loader_ts_43b523b5._.js.map
│ │ │ ├─ [next]_entry_page-loader_ts_742e4b53._.js
│ │ │ ├─ [next]_entry_page-loader_ts_742e4b53._.js.map
│ │ │ ├─ [next]_internal_font_google_be_vietnam_pro_b421c93d_module_css_bad6b30c._.single.css
│ │ │ ├─ [next]_internal_font_google_be_vietnam_pro_b421c93d_module_css_bad6b30c._.single.css.map
│ │ │ ├─ [next]_internal_font_google_plus_jakarta_sans_31a8d45e_module_css_bad6b30c._.single.css
│ │ │ ├─ [next]_internal_font_google_plus_jakarta_sans_31a8d45e_module_css_bad6b30c._.single.css.map
│ │ │ ├─ [root-of-the-server]**092393de._.js
│ │ │ ├─ [root-of-the-server]\_\_092393de._.js.map
│ │ │ ├─ [root-of-the-server]**2e3218bf.\_.css
│ │ │ ├─ [root-of-the-server]**2e3218bf._.css.map
│ │ │ ├─ [root-of-the-server]\_\_45f039c3._.js
│ │ │ ├─ [root-of-the-server]**45f039c3._.js.map
│ │ │ ├─ [turbopack]\_browser_dev_hmr-client_hmr-client_ts_956a0d3a._.js
│ │ │ ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_956a0d3a._.js.map
│ │ │ ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_c7192189._.js
│ │ │ ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_c8c997ce._.js
│ │ │ ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_c8c997ce._.js.map
│ │ │ ├─ _1733ca24._.js
│ │ │ ├─ _1733ca24._.js.map
│ │ │ ├─ _1e646536._.js
│ │ │ ├─ _1e646536._.js.map
│ │ │ ├─ _202e623f._.js
│ │ │ ├─ _d2358ea2._.js
│ │ │ ├─ _d83b0fd8._.js.map
│ │ │ ├─ _e86aceef._.js
│ │ │ ├─ _e86aceef._.js.map
│ │ │ ├─ pages
│ │ │ │ ├─ \_app.js
│ │ │ │ └─ \_error.js
│ │ │ ├─ pages**app*0fce199e.*.js.map
│ │ │ ├─ pages**app*2da965e7.*.js
│ │ │ ├─ pages**error*2da965e7.*.js
│ │ │ ├─ pages**error*af01c4e3.*.js.map
│ │ │ ├─ src*app_favicon_ico_mjs_81d86e48.*.js
│ │ │ ├─ src*app_gestion_nueva_page_tsx_0a0ba3d0.*.js
│ │ │ ├─ src*app_gestion_page_tsx_0a0ba3d0.*.js
│ │ │ ├─ src*app_globals_css_bad6b30c.*.single.css
│ │ │ ├─ src*app_globals_css_bad6b30c.*.single.css.map
│ │ │ ├─ src*app_jugar_page_tsx_0a0ba3d0.*.js
│ │ │ ├─ src*app_jugar_page_tsx_79e9f012.*.js
│ │ │ ├─ src*app_layout_tsx_1cf6b850.*.js
│ │ │ ├─ src*app_page_tsx_0a0ba3d0.*.js
│ │ │ ├─ src*app_page_tsx_79e9f012.*.js
│ │ │ ├─ src*app_perfil_page_tsx_0a0ba3d0.*.js
│ │ │ ├─ src*app_records_page_tsx_0a0ba3d0.*.js
│ │ │ ├─ src*app_registro_page_tsx_0a0ba3d0.*.js
│ │ │ ├─ src*app_resultado_acierto_page_tsx_0a0ba3d0.*.js
│ │ │ ├─ src*app_resultado_acierto_page_tsx_79e9f012.*.js
│ │ │ ├─ src*app_resultado_fallo_page_tsx_0a0ba3d0.*.js
│ │ │ ├─ src*app_resultado_fallo_page_tsx_79e9f012.*.js
│ │ │ ├─ src*app_temas_page_tsx_0a0ba3d0.*.js
│ │ │ ├─ src*app_temas_page_tsx_79e9f012.*.js
│ │ │ ├─ turbopack-_23a915ee._.js
│ │ │ ├─ turbopack-pages**app*0fce199e.*.js
│ │ │ └─ turbopack-pages\__error_af01c4e3._.js
│ │ ├─ development
│ │ │ ├─ \_buildManifest.js
│ │ │ ├─ \_clientMiddlewareManifest.json
│ │ │ └─ \_ssgManifest.js
│ │ └─ media
│ │ ├─ 0b1dc8ddaa74ba49-s.8624a701.woff2
│ │ ├─ 1a099d89ee94ee96-s.f6ed4c33.woff2
│ │ ├─ 3c285486269019b7-s.p.f6eddd95.woff2
│ │ ├─ 3eca85881bcfa204-s.p.70aaf131.woff2
│ │ ├─ 53e45098eac42afb-s.cedabf29.woff2
│ │ ├─ 625a092f804baad3-s.75ecebf5.woff2
│ │ ├─ 6afabefbb32d7517-s.cace8832.woff2
│ │ ├─ 6f42e0a3b0519c4d-s.p.7183773d.woff2
│ │ ├─ 7b74840ea7c05e95-s.29cdc01c.woff2
│ │ ├─ 85ea1b3aadcead52-s.4bda54ec.woff2
│ │ ├─ 8f46d218c8f79e34-s.p.12435988.woff2
│ │ ├─ 8ffc259da9d23054-s.8ab0ac6e.woff2
│ │ ├─ 9e486ba39c38fb8a-s.190f34c5.woff2
│ │ ├─ a3bcb02a0e9e5d11-s.5d07ebb5.woff2
│ │ ├─ a4f4f75ad654963f-s.p.bab09490.woff2
│ │ ├─ b35fd19aef91b293-s.d77488a5.woff2
│ │ ├─ e629b5bc06499d58-s.8e66b869.woff2
│ │ ├─ favicon.0b3bf435.ico
│ │ ├─ fba5a26ea33df6a3-s.p.1bbdebe6.woff2
│ │ └─ fcf129058e6e31f2-s.97839e11.woff2
│ ├─ trace
│ └─ types
│ ├─ cache-life.d.ts
│ ├─ routes.d.ts
│ └─ validator.ts
├─ AGENTS.md
├─ CLAUDE.md
├─ README.md
├─ README_ZIP.md
├─ eslint.config.mjs
├─ lib
│ ├─ auth.ts
│ └─ prisma.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ playwright.config.ts
├─ postcss.config.mjs
├─ prisma
│ ├─ schema.prisma
│ └─ seed.ts
├─ propuesta
│ ├─ ModeloBD.png
│ ├─ README-modelo-pantallas.md
│ ├─ modelo-propuesto.dbml
│ ├─ pantalla1.png
│ └─ pantalla2.png
├─ public
│ ├─ file.svg
│ ├─ globe.svg
│ ├─ next.svg
│ ├─ vercel.svg
│ └─ window.svg
├─ src
│ ├─ app
│ │ ├─ actions
│ │ │ ├─ categories.ts
│ │ │ ├─ questions-admin.ts
│ │ │ └─ questions.ts
│ │ ├─ api
│ │ │ ├─ [...nextauth]
│ │ │ │ └─ route.ts
│ │ │ └─ registro
│ │ │ └─ route.ts
│ │ ├─ components
│ │ │ ├─ AppHeader.tsx
│ │ │ └─ BottomNav.tsx
│ │ ├─ favicon.ico
│ │ ├─ gestion
│ │ │ ├─ DeleteButton.tsx
│ │ │ ├─ data.ts
│ │ │ ├─ editar
│ │ │ │ └─ [id]
│ │ │ │ └─ page.tsx
│ │ │ ├─ nueva
│ │ │ │ └─ page.tsx
│ │ │ └─ page.tsx
│ │ ├─ globals.css
│ │ ├─ jugar
│ │ │ └─ page.tsx
│ │ ├─ layout.tsx
│ │ ├─ page.tsx
│ │ ├─ perfil
│ │ │ └─ page.tsx
│ │ ├─ records
│ │ │ └─ page.tsx
│ │ ├─ registro
│ │ │ └─ page.tsx
│ │ ├─ resultado
│ │ │ ├─ acierto
│ │ │ │ └─ page.tsx
│ │ │ └─ fallo
│ │ │ └─ page.tsx
│ │ └─ temas
│ │ └─ page.tsx
│ ├─ proxy.ts
│ └─ types
│ └─ next-auth.d.ts
└─ tsconfig.json

```

```
