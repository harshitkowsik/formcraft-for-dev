# FormCraft

A modern form builder and management library for creating, validating, and handling complex forms with ease.

## Features

- **Easy Form Creation**: Build forms with a simple, intuitive API
- **Validation**: Built-in validation rules and custom validators
- **Field Management**: Handle multiple field types and configurations
- **State Management**: Track form state and changes
- **Error Handling**: Comprehensive error messages and handling
- **Responsive Design**: Mobile-friendly form layouts
- **Extensible**: Create custom fields and validators

## Installation

```bash
npm install formcraft
```

## Quick Start

```javascript
import FormCraft from 'formcraft';

const form = new FormCraft({
  fields: [
    { name: 'email', type: 'email', required: true },
    { name: 'password', type: 'password', required: true }
  ]
});

form.validate();
```

## Documentation

For detailed documentation, visit [docs](./docs)

## Contributing

Contributions are welcome! Please read our [CONTRIBUTING](./CONTRIBUTING.md) guide.

## License

MIT License - see [LICENSE](./LICENSE) file for details
