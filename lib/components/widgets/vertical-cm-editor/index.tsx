'use client'

import detectIndent from 'detect-indent'
import type { PropsWithChildren } from 'react'
import { useDeferredValue, useEffect, useRef, useState } from 'react'

import type { EditorView } from '@codemirror/view'

import { CodeMirrorEditor } from '~/lib/components/universal/codemirror'
import { useGetState } from '~/lib/hooks/use-get-state'

export const VerticalCmEditor = (
  props: PropsWithChildren<{
    transformFn: (value: any) => any
  }>,
) => {
  const [value, setValue] = useState('')
  const deferredValue = useDeferredValue(value)
  const [transformedValue, setTransformedValue] = useState('')

  const cmRef = useRef<EditorView>(null)
  const getProps = useGetState(props)
  useEffect(() => {
    try {
      if (!deferredValue) return

      const value = JSON.parse(deferredValue)
      if (typeof value !== 'object' && value) return setTransformedValue(value)
      setTransformedValue(
        JSON.stringify(
          getProps().transformFn(value),
          null,
          detectIndent(deferredValue).amount,
        ),
      )
    } catch (e) {
      // message.error((e as Error).message)
    }
  }, [deferredValue])

  useEffect(() => {
    setTimeout(() => {
      cmRef.current?.focus()
    }, 100)
  }, [])

  return (
    <section className="flex flex-col -mt-4 -ml-4">
      <CodeMirrorEditor
        ref={cmRef}
        value={value}
        onChange={setValue}
        language="json"
        className="!h-[50vh] relative overflow-auto flex-shrink-0 flex-grow"
      />
      <div className="h-[1px] bg-gray-400 w-full" />
      <div>
        <CodeMirrorEditor
          value={transformedValue}
          language="json"
          className="flex-shrink-0 !h-[50vh] relative overflow-auto flex-grow"
        />
      </div>
    </section>
  )
}
