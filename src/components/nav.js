'use client'

export default function Nav() {
    const handlePrint = () => {
        var css = '@page { size: landscape; } @media print { body{ width:1400px; } }',
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';
        style.media = 'print';

        if (style.styleSheet){
        style.styleSheet.cssText = css;
        } else {
        style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);
        window.print(); // This will trigger the print dialog
    };

    return (
      <div >
        <div className="p-4 my-nav flex flex-row">
            <div className="text-2xl font-bold w-1/2 my-heading">
                CoderOnline
            </div>
            <div className="w-1/2 button-div text-right">
                <button className="text-white font-bold py-2 px-10 mr-5 rounded-full my-button" onClick={handlePrint}>
                    Save report
                </button>
            </div>
        </div>
      </div>
    );
  }