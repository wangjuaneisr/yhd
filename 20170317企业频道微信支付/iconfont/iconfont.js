;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-PXshangjiantou" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M758.642133 649.268267L502.731733 393.357867c-6.2496-6.250667-14.491733-9.368533-22.731733-9.3568-8.238933-0.011733-16.481067 3.1072-22.731733 9.3568L201.357867 649.268267c-12.477867 12.477867-12.477867 32.894933 0 45.3728s32.894933 12.477867 45.3728 0L480 461.373867l233.268267 233.268266c12.477867 12.477867 32.894933 12.477867 45.3728 0s12.477867-32.896 0.001066-45.373866z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-PXchahao" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M602.508737 512.001867l403.132397-403.132397c24.474577-24.475644 24.474577-64.525631 0-89.001276l-1.508262-1.508261c-24.475644-24.474577-64.525631-24.474577-89.000208 0L511.998133 421.49233 108.866803 18.359933c-24.476711-24.474577-64.526698-24.474577-89.001275 0l-1.508262 1.508261c-24.474577 24.475644-24.474577 64.525631 0 89.001276L421.488597 512.001867 18.3562 915.134264c-24.474577 24.474577-24.474577 64.524565 0 89.000208l1.508261 1.508262c24.474577 24.474577 64.524565 24.474577 89.001275 0L511.998133 602.511403l403.132397 403.132397c24.474577 24.474577 64.524565 24.474577 89.000209 0l1.508261-1.508261c24.474577-24.475644 24.474577-64.525631 0-89.000209L602.508737 512.001867z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-invoce" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M320 352h384v64H320zM320 512h384v64H320z"  ></path>' +
    '' +
    '<path d="M736 192H288c-52.906667 0-96 43.093333-96 96v576c0 52.906667 43.093333 96 96 96h64c17.706667 0 32-14.293333 32-32s-14.293333-32-32-32h-64c-17.6 0-32-14.4-32-32V288c0-17.6 14.4-32 32-32h448c17.6 0 32 14.4 32 32v352H608c-52.906667 0-96 43.093333-96 96v192c0 10.56 5.12 19.946667 13.013333 25.813333 0.106667 0.106667 0.213333 0.106667 0.32 0.213334 0.32 0.213333 0.533333 0.426667 0.853334 0.64 0.32 0.213333 0.746667 0.426667 1.066666 0.746666 0 0 0.106667 0 0.106667 0.106667 2.24 1.386667 4.586667 2.346667 6.933333 3.093333h0.106667l1.28 0.32c0.106667 0 0.213333 0.106667 0.32 0.106667 0.32 0.106667 0.746667 0.213333 1.066667 0.213333 0.106667 0 0.32 0.106667 0.426666 0.106667 0.32 0.106667 0.64 0.106667 0.96 0.213333 0.213333 0 0.426667 0.106667 0.64 0.106667 0.32 0 0.64 0.106667 0.96 0.106667 0.213333 0 0.426667 0.106667 0.64 0.106666 0.32 0 0.64 0.106667 0.96 0.106667h4.266667c0.32 0 0.64 0 0.96-0.106667 0.213333 0 0.426667 0 0.64-0.106666 0.32 0 0.64-0.106667 0.96-0.106667 0.213333 0 0.426667-0.106667 0.64-0.106667 0.32-0.106667 0.64-0.106667 0.96-0.213333 0.106667 0 0.32-0.106667 0.426667-0.106667 0.32-0.106667 0.746667-0.213333 1.066666-0.213333 0.106667 0 0.213333-0.106667 0.32-0.106667l1.28-0.32h0.106667c2.453333-0.746667 4.693333-1.813333 6.933333-3.093333 0 0 0.106667 0 0.106667-0.106667 0.32-0.213333 0.746667-0.426667 1.066667-0.746666 0.32-0.213333 0.533333-0.426667 0.853333-0.64 0.106667-0.106667 0.213333-0.106667 0.32-0.213334 1.706667-1.28 3.306667-2.666667 4.8-4.266666l236.16-236.266667c18.133333-18.133333 28.16-42.24 28.16-67.84V288c0.32-52.906667-42.773333-96-95.68-96zM608 704h114.773333L576 850.773333V736c0-17.6 14.4-32 32-32z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-package" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M977.066667 212.693333L527.04 89.386667H518.4c-0.533333 0-1.066667 0-1.493333 0.533333L68.906667 213.333333h-2.666667s-0.533333 0-0.533333 0.533334c0 0-0.533333 0-0.533334 0.533333l-0.533333 0.533333s-0.533333 0-0.533333 0.533334c-0.533333 0-0.533333 0.533333-1.066667 0.533333l-0.533333 0.533333-0.533334 0.533334-0.533333 0.533333-0.533333 0.533333-0.533334 0.533334v0.533333s0 0.533333-0.533333 0.533333l-0.533333 0.533334s0 0.533333-0.533334 0.533333l-0.533333 0.533333-0.533333 0.533334s0 0.533333-0.533334 0.533333v0.533333s0 0.533333-0.533333 0.533334v1.6s0 0.533333-0.533333 0.533333v564.48c0 7.68 5.12 14.826667 12.8 17.386667l478.186666 152.106666h10.453334c0.533333 0 0.533333 0 1.066666-0.533333h0.533334l419.306666-152.106667c7.146667-2.56 11.733333-9.173333 11.733334-16.853333V230.613333c0.213333-8.64-4.906667-15.786667-13.12-17.92zM534.72 915.733333L92.906667 775.466667V253.653333l441.813333 128v534.08z m28.16-559.68l-421.866667-125.866666L248.533333 200.426667l85.013334-23.573334 418.346666 126.506667c-93.226667 27.626667-184.853333 53.76-189.013333 52.693333zM812.8 285.44L395.946667 159.466667l39.466666-10.773334 87.04-24.106666 431.573334 118.826666S889.6 262.933333 812.8 285.44z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-warning" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M480 736m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"  ></path>' +
    '' +
    '<path d="M480 128C250.24 128 64 314.24 64 544s186.24 416 416 416 416-186.24 416-416-186.24-416-416-416z m248.853333 664.853333c-32.32 32.32-69.973333 57.706667-111.893333 75.413334-43.306667 18.453333-89.386667 27.733333-136.96 27.733333s-93.653333-9.28-136.96-27.626667c-41.92-17.706667-79.573333-43.093333-111.893333-75.413333s-57.706667-69.973333-75.413334-111.893333c-18.453333-43.413333-27.733333-89.493333-27.733333-137.066667s9.28-93.653333 27.626667-136.96c17.706667-41.92 43.093333-79.573333 75.413333-111.893333s69.973333-57.706667 111.893333-75.413334c43.413333-18.453333 89.493333-27.733333 137.066667-27.733333s93.653333 9.28 136.96 27.626667c41.92 17.706667 79.573333 43.093333 111.893333 75.413333s57.706667 69.973333 75.413334 111.893333c18.453333 43.413333 27.733333 89.493333 27.733333 137.066667s-9.28 93.653333-27.626667 136.96c-17.706667 41.92-43.093333 79.573333-75.52 111.893333z"  ></path>' +
    '' +
    '<path d="M480 320c-17.706667 0-32 14.293333-32 32v256c0 17.706667 14.293333 32 32 32s32-14.293333 32-32V352c0-17.706667-14.293333-32-32-32z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-tick" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M427.626667 950.613333L201.386667 724.373333c-12.48-12.48-12.48-32.746667 0-45.226666s32.746667-12.48 45.226666 0l226.24 226.24c12.48 12.48 12.48 32.746667 0 45.226666s-32.746667 12.48-45.226666 0z"  ></path>' +
    '' +
    '<path d="M834.773333 588.586667L472.746667 950.613333c-12.48 12.48-32.746667 12.48-45.226667 0s-12.48-32.746667 0-45.226666l362.026667-362.026667c12.48-12.48 32.746667-12.48 45.226666 0s12.48 32.746667 0 45.226667z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-PXchahao1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M557.25411 512L1014.666138 54.589038c12.44586-12.444794 12.44586-32.809583 0-45.255443-12.44586-12.444794-32.81065-12.444794-45.255443 0L511.999733 466.744557 54.588772 9.333595C42.143978-3.111198 21.779189-3.111198 9.333328 9.333595c-12.443727 12.44586-12.443727 32.81065 0 45.255443L466.74429 512 9.333328 969.410962c-12.443727 12.444794-12.443727 32.809583 0 45.255443 12.44586 12.444794 32.81065 12.444794 45.255444 0L511.999733 557.255443 969.410695 1014.666405c12.444794 12.444794 32.809583 12.444794 45.255443 0 12.44586-12.44586 12.44586-32.81065 0-45.255443L557.25411 512z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-PXxiajiantou" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M758.642133 393.357867c-12.477867-12.477867-32.894933-12.477867-45.3728 0L480 626.6272l-233.268267-233.269333c-12.477867-12.477867-32.894933-12.477867-45.3728 0s-12.477867 32.894933 0 45.3728L457.269333 694.641067c6.2496 6.250667 14.491733 9.368533 22.731734 9.3568 8.238933 0.011733 16.481067-3.1072 22.731733-9.3568L758.6432 438.730667c12.475733-12.4768 12.475733-32.894933-0.001067-45.3728z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-gouxuan" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M476.32896 664.3456s14.44864 1.75104 28.3136-11.53024l208.05632-208.05632s12.48256-12.47744 10.2912-28.46208c0 0-0.44032-17.73056-10.07104-25.83552 0 0-11.8272-11.82208-26.49088-11.82208 0 0-17.08032-0.87552-29.99296 12.04224l-179.63008 180.0704L374.59968 468.48s-12.2624-12.84096-28.89728-11.6736c0 0-16.78336 0.4352-26.56256 11.6736 0 0-10.21952 8.02816-11.38688 25.97888 0 0-0.73216 16.49152 11.82208 29.48096l129.16736 128.87552c0.00512 0 10.07104 11.38688 27.58656 11.53024z"  ></path>' +
    '' +
    '<path d="M515.6608 95.29344C285.83936 95.29344 99.5328 281.6 99.5328 511.42144a414.8992 414.8992 0 0 0 18.49344 122.75712c0.05632 0.18432 0.16896 0.32768 0.24576 0.50176 4.18304 17.06496 19.68128 29.7472 38.20544 29.7472 21.73952 0 39.36256-17.4336 39.36256-38.94784a38.4768 38.4768 0 0 0-2.9696-14.82752 337.4848 337.4848 0 0 1-14.89408-99.2256c0-186.87488 151.49056-338.36032 338.36032-338.36032 186.87488 0 338.37056 151.49056 338.37056 338.36032 0 186.87488-151.49568 338.36544-338.37056 338.36544-91.88352 0-175.16032-36.68992-236.1344-96.14336a39.424 39.424 0 0 0-28.3648-11.98592c-21.7344 0-39.36256 17.4336-39.36256 38.94272 0 10.8288 4.47488 20.61824 11.68384 27.67872l-0.00512 0.00512c75.0848 73.73312 177.95584 119.26528 291.50208 119.26528 229.82144 0 416.128-186.31168 416.128-416.128s-186.30144-416.13312-416.12288-416.13312z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-scan" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M928.389 542.954H94.532c-17.706 0-32.074-14.366-32.074-32.066 0-17.706 14.368-32.073 32.074-32.073h833.856c17.733 0 32.073 14.368 32.073 32.073 0 17.7-14.339 32.066-32.072 32.066z m-96.217 384.848H639.746c-17.734 0-32.073-14.34-32.073-32.073s14.34-32.073 32.073-32.073h192.426c17.706 0 32.074-14.366 32.074-32.066V671.239c0-17.734 14.334-32.074 32.075-32.074 17.734 0 32.068 14.34 32.068 32.074v160.35c0 53.043-43.168 96.213-96.217 96.213z m-481.073 0H190.741c-53.042 0-96.21-43.171-96.21-96.212V671.239c0-17.734 14.368-32.074 32.068-32.074 17.705 0 32.074 14.34 32.074 32.074v160.35c0 17.7 14.398 32.067 32.068 32.067h160.358c17.706 0 32.074 14.34 32.074 32.073s-14.368 32.073-32.074 32.073zM126.6 382.602c-17.7 0-32.067-14.366-32.067-32.065V190.186c0-53.046 43.168-96.212 96.209-96.212H351.1c17.705 0 32.073 14.368 32.073 32.073 0 17.699-14.368 32.066-32.073 32.066H190.74c-17.67 0-32.067 14.402-32.067 32.073v160.35c0 17.7-14.369 32.067-32.074 32.067z m769.72 0c-17.74 0-32.074-14.366-32.074-32.065V190.186c0-17.672-14.368-32.073-32.074-32.073H639.746c-17.734 0-32.073-14.367-32.073-32.066 0-17.705 14.34-32.073 32.073-32.073h192.426c53.049 0 96.217 43.166 96.217 96.212v160.35c0 17.7-14.334 32.067-32.068 32.067z m0 0"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-PXyoujiantou" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M694.6688 521.332267a32.986667 32.986667 0 0 0-1.402667-1.313067l-382.688-382.686933c-12.442667-12.443733-32.8032-12.443733-45.245866 0-12.442667 12.442667-12.442667 32.8032-0.001067 45.245866L626.754133 544 265.332267 905.421867c-12.442667 12.442667-12.442667 32.8032 0 45.245866 12.442667 12.443733 32.8032 12.443733 45.246933 0l382.686933-382.686933c0.475733-0.4224 0.946133-0.8576 1.402667-1.313067 6.232533-6.232533 9.341867-14.452267 9.330133-22.667733 0.011733-8.215467-3.0976-16.4352-9.330133-22.667733z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-PXjiahao" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M928 448H512V32c0-17.6-14.4-32-32-32s-32 14.4-32 32v416H32c-17.6 0-32 14.4-32 32s14.4 32 32 32h416v416c0 17.6 14.4 32 32 32s32-14.4 32-32V512h416c17.6 0 32-14.4 32-32s-14.4-32-32-32z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-invoce1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M624.709333 239.806933H249.1264c-17.672533 0-32 14.327467-32 32s14.327467 32 32 32h375.582933c17.672533 0 32-14.327467 32-32s-14.327467-32-32-32zM656.709333 424.8576c0-17.672533-14.327467-32-32-32H249.1264c-17.672533 0-32 14.327467-32 32s14.327467 32 32 32h375.582933c17.672533 0 32-14.3264 32-32zM247.060267 542.247467c-17.672533 0-32 14.327467-32 32s14.327467 32 32 32h127.9488c17.672533 0 32-14.327467 32-32s-14.327467-32-32-32H247.060267z"  ></path>' +
    '' +
    '<path d="M700.192 97.169067h-25.175467a32.426667 32.426667 0 0 0-2.8384-0.132267c-17.672533 0-32 14.327467-32 32 0 17.6128 14.231467 31.898667 31.821867 31.995733v0.136534h28.192c6.3584 0 11.531733 5.172267 11.531733 11.5296v405.9392H510.0224c-51.844267 0-94.0224 45.268267-94.0224 100.910933V864H171.5328c-6.3584 0-11.5328-5.1712-11.5328-11.5296V172.698667c0-6.357333 5.1744-11.5296 11.5328-11.5296H224v-0.132267c17.672533 0 32-14.327467 32-32s-14.327467-32-32-32c-0.9568 0-1.901867 0.050133-2.8384 0.132267h-49.6288C129.806933 97.169067 96 130.976 96 172.698667v679.7728C96 894.194133 129.806933 928 171.5328 928h288.548267L775.722667 612.333867V172.698667c0-41.722667-33.806933-75.5296-75.530667-75.5296zM480 817.566933V679.547733c0-20.352 13.467733-36.910933 30.0224-36.910933h144.893867L480 817.566933z"  ></path>' +
    '' +
    '<path d="M320 161.0368h256c17.672533 0 32-14.327467 32-32s-14.327467-32-32-32h-48.32c-3.528533-29.2832-37.8432-52.267733-79.68-52.267733s-76.152533 22.984533-79.68 52.267733H320c-17.672533 0-32 14.327467-32 32s14.327467 32 32 32z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-location1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 937.4112a31.914667 31.914667 0 0 1-21.931733-8.6976c-3.140267-2.954667-77.7664-73.490133-153.5072-170.849067-104.128-133.845333-156.9248-248.888533-156.9248-341.933866 0-43.346133 8.8576-85.400533 26.327466-124.993067 16.8256-38.133333 40.882133-72.352 71.502934-101.704533C340.184533 129.111467 423.477333 96 512 96s171.815467 33.111467 234.533333 93.233067c30.6208 29.352533 54.677333 63.5712 71.502934 101.704533 17.469867 39.592533 26.327467 81.646933 26.327466 124.993067 0 93.044267-52.7968 208.088533-156.9248 341.933866-75.7408 97.357867-150.366933 167.8944-153.5072 170.849067A31.914667 31.914667 0 0 1 512 937.4112zM512 160c-147.976533 0-268.363733 114.8096-268.363733 255.930667 0 159.4112 200.705067 376.042667 268.3552 444.523733 67.6512-68.5312 268.372267-285.3088 268.372266-444.523733C780.363733 274.8096 659.976533 160 512 160z"  ></path>' +
    '' +
    '<path d="M512 544c-70.5792 0-128-57.4208-128-128s57.4208-128 128-128 128 57.4208 128 128-57.4208 128-128 128z m0-192c-35.2896 0-64 28.7104-64 64s28.7104 64 64 64 64-28.7104 64-64-28.7104-64-64-64z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-question1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M391.191467 215.144533c0.914133-1.0528 1.834667-2.0992 2.776533-3.127466a32.170667 32.170667 0 0 0-2.776533 3.127466z"  ></path>' +
    '' +
    '<path d="M512 96C282.248533 96 96 282.248533 96 512c0 229.7504 186.248533 416 416 416s416-186.2496 416-416c0-229.751467-186.2496-416-416-416z m248.901333 664.901333c-32.347733 32.347733-69.998933 57.7376-111.9072 75.463467C605.639467 854.701867 559.547733 864 512 864s-93.639467-9.298133-136.994133-27.6352c-41.908267-17.725867-79.559467-43.115733-111.9072-75.463467-32.347733-32.347733-57.736533-69.997867-75.4624-111.906133C169.298133 605.639467 160 559.547733 160 512c0-47.5488 9.298133-93.640533 27.6352-136.9952 17.725867-41.908267 43.114667-79.5584 75.4624-111.9072 32.347733-32.347733 69.998933-57.736533 111.9072-75.4624C418.359467 169.298133 464.4512 160 512 160s93.639467 9.298133 136.9952 27.6352c41.908267 17.725867 79.559467 43.114667 111.9072 75.4624 32.347733 32.347733 57.736533 69.998933 75.4624 111.9072C854.701867 418.359467 864 464.452267 864 512s-9.298133 93.639467-27.636267 136.9952c-17.7248 41.908267-43.114667 79.5584-75.4624 111.906133z"  ></path>' +
    '' +
    '<path d="M512 736m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"  ></path>' +
    '' +
    '<path d="M525.8496 247.7088c-0.0864 0-0.171733 0.0032-0.258133 0.0032-0.0864 0-0.171733-0.0032-0.258134-0.0032-46.740267 0-88.781867 20.056533-118.032 52.017067-0.9408 1.028267-1.8624 2.074667-2.776533 3.127466a32.066133 32.066133 0 0 0-1.9904 2.9056c-22.913067 27.6832-36.6848 63.207467-36.685867 101.949867h0.606934a31.921067 31.921067 0 0 0-0.632534 6.324267c0 17.6128 14.338133 31.8912 32.0256 31.8912s32.024533-14.279467 32.024534-31.8912c0-2.165333-0.218667-4.279467-0.632534-6.324267h0.606934c0-52.848 42.926933-95.856 95.741866-95.9968 52.816 0.139733 95.741867 43.1488 95.741867 95.9968 0 43.082667-28.528 79.624533-67.684267 91.735467a96.021333 96.021333 0 0 0-6.0256 1.6448 95.469867 95.469867 0 0 0-22.289066 10.200533c-27.1936 16.9504-45.294933 47.121067-45.294934 81.5232v47.296c0 17.6128 14.338133 31.8912 32.0256 31.8912s32.0256-14.279467 32.0256-31.8912v-47.296h-0.0512c0-13.5584 8.488533-25.152 20.421334-29.803733 69.710933-17.272533 121.389867-80.247467 121.389866-155.2992 0.001067-88.366933-71.634133-160.001067-159.998933-160.001067z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-delet" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M192 896h64v64h512v-64h64V256H192v640z m448-448h64v320h-64V448z m-320 0h64v320h-64V448zM704 128V64H320v64H192v64h640v-64z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-edit" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M937.249067 153.3152l-66.983467-66.977067c-27.755733-27.722667-72.698667-27.722667-100.455467 0l-83.7728 83.733334 167.4752 167.4656 83.736534-83.698134c27.7568-27.752533 27.7568-72.768 0-100.523733zM199.512533 656.577067L366.986667 824.0416l455.28-451.704533L654.794667 204.869333zM64.971733 961.3856l267.9648-106.061867-166.069333-166.1024z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-PXjiahao1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M960.033316 448.299844h-383.800104v-383.800104c0-35.327733-28.638951-63.966684-63.966684-63.966684s-63.966684 28.638951-63.966684 63.966684v383.800104h-383.800104c-35.327733 0-63.966684 28.638951-63.966684 63.966684s28.638951 63.966684 63.966684 63.966684h383.800104v383.800104c0 35.327733 28.638951 63.966684 63.966684 63.966684s63.966684-28.638951 63.966684-63.966684v-383.800104h383.800104c35.327733 0 63.966684-28.638951 63.966684-63.966684s-28.638951-63.966684-63.966684-63.966684z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-icon-1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M391.191467 256c0.914133-1.0528 1.834667-2.0992 2.776533-3.127467a32.170667 32.170667 0 0 0-2.776533 3.127467z"  ></path>' +
    '' +
    '<path d="M512 490.666667m-341.333333 0a341.333333 341.333333 0 1 0 682.666666 0 341.333333 341.333333 0 1 0-682.666666 0Z"  ></path>' +
    '' +
    '<path d="M576 480c0 35.346133-28.653867 64-64 64s-64-28.653867-64-64V288c0-35.346133 28.653867-64 64-64s64 28.653867 64 64v192zM576 672c0 35.346133-28.653867 64-64 64s-64-28.653867-64-64 28.653867-64 64-64 64 28.653867 64 64z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)