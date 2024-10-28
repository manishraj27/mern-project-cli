name: Other Issue
description: Report other issues or request assistance
labels: ['question', 'help wanted']
body:
  - type: textarea
    id: issue_type
    attributes:
      label: Issue Type
      description: Specify the type of issue (e.g., documentation, support, general question).
    validations:
      required: true
  - type: textarea
    id: description
    attributes:
      label: Description
      description: A clear and concise description of the issue or question.
    validations:
      required: true
  - type: textarea
    id: context
    attributes:
      label: Additional Context
      description: Provide any additional context, background, or details.
  - type: checkboxes
    id: checklist
    attributes:
      label: Checklist
      description: Please ensure you've completed the following:
      options:
        - label: I have read the [Contributing Guidelines](https://github.com/manishraj27/mern-project-cli/blob/main/CONTRIBUTING.md)
          required: true
        - label: I have searched for [existing issues](https://github.com/manishraj27/mern-project-cli/issues) and this is a new issue
          required: true
