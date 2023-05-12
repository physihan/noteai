import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

export function MyPopover({open=true}) {
  return (
    /* Render a `nav` instead of a `div` */
    <Popover>
      {({  }) => (
        <>

          {open && (
            <div>
              {/*
                Using the `static` prop, the `Popover.Panel` is always
                rendered and the `open` state is ignored.
              */}
              <Popover.Panel static>

                ssss
              </Popover.Panel>
            </div>
          )}
        </>
      )}
    </Popover>
  );
}
