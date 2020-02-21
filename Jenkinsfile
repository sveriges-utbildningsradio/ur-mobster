@Library(value='ur-shared-library@v4.6.3', changelog=false) _
urWebPipeline(
  appName: "ur-mobster"
//   codeAnalysis: "sonarqube", // valid options: "sonarqube" "sonarqubeAndGate", empty string will skip it
  cmds: [
    [name: "Install", cmd: "yarn install"],
    [name: "Lint & test", cmd:[
                            "yarn lint",
                            "yarn test",
                            "yarn lint",
                            ]],
    [name: "build", cmd: "build-and-test-e2e-headless"]
  ],
  containers: [
    [name: 'app', image: 'node:lts-alpine3.10']
  ],
)