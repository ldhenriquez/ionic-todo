# Respuestas – Prueba Técnica Ionic (Front)

Este documento responde a las **Preguntas Técnicas** del PDF de la prueba.

---

## 1) ¿Qué desafíos técnicos encontraste al implementar el proyecto y cómo los resolviste?

1. **Separación real por capas (Clean Architecture) en un proyecto Angular/Ionic**
   - **Desafío:** en Angular, “interfaces” no existen en runtime, así que no puedes inyectarlas directamente con DI.
   - **Solución:** se definieron **InjectionTokens** para los repositorios y se configuraron en `AppModule`.
     - Resultado: el **dominio** depende de abstracciones (interfaces) y la **implementación** queda en la capa `data`.

2. **Persistencia local sin perder responsividad**
   - **Desafío:** guardar en storage “en cada cambio” puede volver lenta la UI y aumentar el desgaste de I/O.
   - **Solución:** los repositorios mantienen el estado en `BehaviorSubject` y se hace persistencia con **debounce** (por ejemplo 250ms), evitando escrituras excesivas.

3. **Feature Flags con Firebase Remote Config sin romper la experiencia Web**
   - **Desafío:** en **web** no hay plugin de Cordova; en **mobile** sí. Además, Remote Config es asíncrono.
   - **Solución:** se creó un servicio de feature flags que:
     - Usa valores **por defecto** desde `environment.*`.
     - En Cordova, intenta cargar Remote Config y hace **fallback seguro** si el plugin no está disponible.

4. **Navegación y capas de UI (pointer-events / overlays)**
   - **Desafío:** al combinar ciertos contenedores de navegación de Ionic (por ejemplo, `ion-router-outlet` anidado + tabs) puede aparecer un overlay que intercepta clicks.
   - **Solución:** se simplificó la estructura de navegación para evitar `router-outlet` anidados conflictivos y se validó que **FAB, botones y navegación** respondan correctamente.

---

## 2) ¿Qué técnicas usaste para optimizar el rendimiento de la aplicación y por qué?

1. **Lazy Loading por rutas**
   - Se cargan los módulos cuando el usuario los necesita (menor bundle inicial).
   - Se usa `NoPreloading` para evitar cargar todo al inicio.

2. **`ChangeDetectionStrategy.OnPush` + `async` pipe**
   - Reduce ciclos de detección de cambios.
   - Evita suscripciones manuales y fugas de memoria.

3. **`trackBy` en listas (`*ngFor`)**
   - Evita re-renderizar elementos sin cambios, especialmente al filtrar/buscar.

4. **Estado derivado con RxJS (sin duplicar estado innecesario)**
   - La lista mostrada se deriva de `tasks$` + filtros + búsqueda con `combineLatest`.
   - Mantiene un flujo claro y eficiente.

5. **Persistencia con debounce en capa `data`**
   - Minimiza escrituras al almacenamiento local y protege la fluidez de la UI.

---

## 3) ¿Cómo aseguraste la calidad y mantenibilidad del código?

1. **Clean Architecture aplicada (separación por responsabilidades)**
   - `domain/`: modelos + reglas de negocio (UseCases) + contratos (repositorios).
   - `data/`: implementación de repositorios y datasource (Ionic Storage).
   - `presentation/`: páginas, componentes, facades (estado/UX).
   - `core/`: DI, feature flags, utilidades.

2. **Patrón Repository + Use Cases**
   - El dominio define interfaces (`TasksRepository`, `CategoriesRepository`).
   - Las acciones principales se encapsulan en **casos de uso** (ej. `AddTaskUseCase`, `ToggleTaskUseCase`).
   - Facilita cambios futuros (por ejemplo, migrar storage local a API) sin tocar UI.

3. **Tipado estricto y contrato claro**
   - Modelos tipados (`Task`, `Category`) y IDs (`TaskId`, `CategoryId`).
   - Flujo de datos más predecible, menos errores en runtime.

4. **Documentación y scripts**
   - `README.md` con pasos de ejecución y build.
   - `docs/` con guías de build y descripción de Feature Flags.

5. **Mejoras recomendadas (si se quisiera extender)**
   - Unit tests en UseCases y repositorios.
   - E2E para flujos críticos.
   - Debounce en búsqueda de UI si se espera un volumen muy alto.

---

## Feature Flag (Firebase Remote Config)

### Flags implementadas
- `ff_categories`: habilita/deshabilita la UI relacionada con categorías.
- `ff_bulk_actions`: habilita/deshabilita acciones masivas.

### Cómo probar rápido
1. En **web**, cambia valores por defecto en `environment.ts` / `environment.prod.ts` y reinicia.
2. En **mobile**, configura Remote Config con esas keys (tipo boolean) y publica.
   - Si Remote Config falla o el plugin no está disponible, se usa **fallback** del `environment`.
