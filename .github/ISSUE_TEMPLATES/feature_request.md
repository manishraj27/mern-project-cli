name: Feature Request
description: Suggest an idea for this project
labels: ['enhancement']
body:
  - type: textarea
    id: description
    attributes:
      label: Description
      description: A clear and concise description of the feature you'd like to see.
    validations:
      required: true
  - type: textarea
    id: motivation
    attributes:
      label: Motivation
      description: Why is this feature important or useful?
    validations:
      required: true
  - type: textarea
    id: solution
    attributes:
      label: Proposed Solution
      description: A clear and concise description of how you think the feature should be implemented.
  - type: checkboxes
    id: checklist
    attributes:
      label: Checklist
      description: Please ensure you've completed the following:
      options:
        - label: I have read the [Contributing Guidelines](https://github.com/manishraj27/mern-project-cli/blob/main/CONTRIBUTING.md)
          required: true
        - label: I have searched for [existing issues](https://github.com/manishraj27/mern-project-cli/issues) and this is a new feature request
          required: true