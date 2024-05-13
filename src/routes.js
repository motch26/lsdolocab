import { createBrowserRouter } from "react-router-dom";

export default createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      let { Component, action } = await import("./components/Login/index.jsx");
      return { Component, action };
    },
  },
  {
    path: "/home",
    lazy: async () => {
      let { Component, loader, action } = await import(
        "./components/Home/index.jsx"
      );
      return { Component, loader, action };
    },
    children: [
      {
        index: true,
        lazy: async () => {
          let { Component } = await import("./components/Home/Boxes.jsx");
          return { Component };
        },
      },
      {
        path: "users",
        lazy: async () => {
          let { Component, loader, action } = await import(
            "./components/Home/Users/index.jsx"
          );
          return { Component, loader, action };
        },
      },
      {
        path: "inventory",
        lazy: async () => {
          let { Component } = await import(
            "./components/Home/Inventory/index.jsx"
          );
          return { Component };
        },
        children: [
          {
            path: "products",
            lazy: async () => {
              let { Component, action, loader } = await import(
                "./components/Home/Inventory/Products/index.jsx"
              );
              return { Component, action, loader };
            },
            children: [
              {
                index: true,
                lazy: async () => {
                  let { Component } = await import(
                    "./components/Home/Inventory/Products/Products.jsx"
                  );
                  return { Component };
                },
              },

              {
                path: ":_id",
                lazy: async () => {
                  let { Component, loader, action } = await import(
                    "./components/Home/Inventory/Products/Product/index.jsx"
                  );
                  return { Component, loader, action };
                },
              },
            ],
          },
          {
            path: "configuration",
            lazy: async () => {
              let { Component, loader, action } = await import(
                "./components/Home/Inventory/Configuration/index.jsx"
              );
              return { Component, loader, action };
            },
            children: [
              {
                index: true,
                lazy: async () => {
                  let { Component } = await import(
                    "./components/Home/Inventory/Configuration/TypesTable.jsx"
                  );
                  return { Component };
                },
              },
            ],
          },
          {
            path: "cargos",
            lazy: async () => {
              let { Component, loader, action } = await import(
                "./components/Home/Inventory/Cargos/index.jsx"
              );
              return { Component, loader, action };
            },
            children: [
              {
                index: true,
                lazy: async () => {
                  let { Component } = await import(
                    "./components/Home/Inventory/Cargos/CargoTable.jsx"
                  );
                  return { Component };
                },
              },
            ],
          },
        ],
      },
    ],
  },
]);
