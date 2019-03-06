import { interpret } from '../../src/interpreter'

describe('interpreter', () => {
  let commandsModule: any
  describe('when commandsModule object given', () => {
    beforeEach(() => {
      commandsModule = {
        a: jest.fn(),
        b: {
          c: jest.fn(),
          d: {
            e: jest.fn()
          }
        },
        default: jest.fn()
      }
    })

    it('calls command', () => {
      interpret({ options: {}, params: ['a'], commandsModule, namespace: '' })
      expect(commandsModule.a).toHaveBeenCalledTimes(1)
      expect(commandsModule.a).toHaveBeenCalledWith({})
    })

    it('calls command with params', () => {
      interpret({
        commandsModule,
        namespace: '',
        options: {},
        params: ['a', 'arg1', 'arg2']
      })
      expect(commandsModule.a).toHaveBeenCalledTimes(1)
      expect(commandsModule.a).toHaveBeenCalledWith({}, 'arg1', 'arg2')
    })

    it('calls command with options', () => {
      const options = { op1: 'o1', op2: 'o2' }
      interpret({
        commandsModule,
        namespace: '',
        options,
        params: ['a']
      })
      expect(commandsModule.a).toHaveBeenCalledTimes(1)
      expect(commandsModule.a).toHaveBeenCalledWith(options)
    })
  })

  describe('when function as commandsModule given', () => {
    beforeEach(() => {
      commandsModule = jest.fn()
    })
  })
})
