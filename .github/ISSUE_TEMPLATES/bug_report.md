name: Bug Report
description: File a bug report
labels: ['bug']
body:
  - type: textarea
    id: description
    attributes:
      label: Description
      description: A clear and concise description of the problem.
    validations:
      required: true
  - type: textarea
    id: steps
    attributes:
      label: Steps to Reproduce
      description: Steps to reproduce the behavior.
    validations:
      required: true
  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      description: A clear and concise description of what you expected to happen.
    validations:
      required: true
  - type: textarea
    id: actual
    attributes:
      label: Actual Behavior
      description: A clear and concise description of what actually happened.
    validations:
      required: true
  - type: input
    id: version
    attributes:
      label: Version
      description: Which version of the MERN Project Generator CLI are you using?
    validations:
      required: true
  - type: textarea
    id: environment
    attributes:
      label: Environment
      description: |
        Please provide the following information about your environment:
        - Operating system
        - Node.js version
        - npm version
        - Any other relevant information
    validations:
      required: true
  - type: checkboxes
    id: checklist
    attributes:
      label: Checklist
      description: Please ensure you've completed the following:
      options:
        - label: I have read the [Contributing Guidelines](https://github.com/manishraj27/mern-project-cli/blob/main/CONTRIBUTING.md)
          required: true
        - label: I have searched for [existing issues](https://github.com/manishraj27/mern-project-cli/issues) and this is a new bug report
          required: true