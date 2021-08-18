import { ThrowStmt } from "@angular/compiler";
import { Component, VERSION } from "@angular/core";
import { throwToolbarMixedModesError } from "@angular/material/toolbar";

interface SelectorModel {
  id: number;
  value: string;
  identifier?: string;
}
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  name = "Angular " + VERSION.major;
  selector: number = 1;
  selectorValue: string = "";
  property: number = 1;
  propertyValue: string = "";
  sourceElement: number = 0;
  titleValue = "";
  pageLanguage = "";
  tabIndex = "";
  dTDDValue = "";
  attributeValue = "";

  // elementValue:string ='';
  elementTypes: SelectorModel[] = [
    { value: "Select", id: 0 },
    { value: "Image", id: 1 },
    { value: "Title", id: 2 },
    { value: "Language", id: 3 },
    { value: "AutoComplete", id: 4 },
    { value: "ARIA-Label", id: 5 },
    { value: "Tab Index", id: 6 },
    { value: "Heading hierarchy", id: 7 },
    { value: "Empty heading", id: 8 },
    { value: "Removing unneccessary attributes", id: 9 },
    { value: "Setting language attribute", id: 10 },
    { value: "Setting tabindex", id: 11 },

    { value: "Marquee/Blink", id: 12 },
    { value: "List item to be in <ol> or <ul>", id: 13 },
    { value: "Setting  attribute", id: 14 },
    { value: "Color contrast", id: 15 },

    { value: "DT DD in DL", id: 16 },
    { value: "Duplicate ID", id: 17 },
    { value: "Iframe title", id: 18 },
  ];
  filterElementTypes: SelectorModel[] = [...this.elementTypes];
  selectors: SelectorModel[] = [
    { value: "By Id", id: 1, identifier: "getElementById" },
    { value: "By Tag", id: 2, identifier: "getElementByTag" },
    { value: "By Class", id: 3, identifier: "getElementByClass" },
    {
      value: "By QuerySelector",
      id: 4,
      identifier: "getElementByQuerySelector",
    },
  ];

  properties: SelectorModel[] = [
    { value: "alt", id: 1, identifier: "select" },
    { value: "value", id: 2, identifier: "select" },
    { value: "others", id: 3, identifier: "select" },
    { value: "autocomplete", id: 4, identifier: "autocomplete" },
    { value: "aria-label", id: 5, identifier: "arialabel" },
    { value: "aria-label", id: 6, identifier: "tet" },
    { value: "aria-labelledby", id: 7, identifier: "tet" },
  ];
  code: string;
  onKey(value) {
    this.filterElementTypes = [...this.search(value)];
  }

  search(value: string) {
    console.log(value);
    let filter = this.elementTypes.filter((item) =>
      item.value.toLowerCase().includes(value.toLowerCase())
    );
    console.log(filter);
    return [...filter];
  }

  getProperties() {
    if (this.sourceElement === 4) {
      return this.properties.filter((p) => p.identifier === "autocomplete");
    } else if (this.sourceElement === 5) {
      return this.properties.filter((p) => p.identifier === "arialabel");
    } else if (this.sourceElement === 14) {
      return this.properties.filter((p) => p.identifier === "tet");
    } else if (this.sourceElement !== 4) {
      return this.properties.filter((p) => p.identifier === "select");
    }
  }
  getLabelName() {
    let text = "";
    if (this.sourceElement === 7) {
      text = "Enter desired heading level Ex: <h1>";
    }
    if (this.sourceElement === 8) {
      text = "Enter heading text";
    }
    if (this.sourceElement === 9) {
      text = "Enter attribute name";
    }
    if (this.sourceElement === 10) {
      text = "Enter language code";
    }
    if (this.sourceElement === 11) {
      text = "Enter tabindex value";
    }

    if (this.sourceElement === 12) {
      text = "Enter desired tag  Ex: <h1>";
    }
    if (this.sourceElement === 13) {
      text = "Enter List parent tag Ex: <ol>";
    }
    if (this.sourceElement === 15) {
      text = "Enter Color hex value";
    }
    if (this.sourceElement === 17) {
      text = "Enter ID value";
    }
    if (this.sourceElement === 18) {
      text = "Enter Title values";
    }
    return text;
  }
  generateCode() {
    if (
      this.sourceElement === 1 ||
      this.sourceElement === 4 ||
      this.sourceElement === 5
    ) {
      var jsString = `
    document.${
      this.selectors.find((s) => s.id === this.selector).identifier
    }("${this.selectorValue}").${
        this.properties.find((p) => p.id === this.property).value
      } = "${this.propertyValue}"
    `;

      var jqString = `
    \$("#${this.selectorValue}").${
        this.properties.find((p) => p.id === this.property).value
      } = "${this.propertyValue}"`;

      this.code = jsString;
    } else if (this.sourceElement === 2) {
      var script = `
      var titleChild=document.createElement('title');
      titleChild.innerHTML="${this.titleValue}";
      document.getElementsByTagName('head')[0].appendChild(titleChild);`;
      this.code = script;
    } else if (this.sourceElement === 3) {
      var script = `
      var htmlTag=document.querySelector("html");
      htmlTag.setAttribute("lang","${this.pageLanguage}");`;
      this.code = script;
    } else if (this.sourceElement === 6) {
      var script = `
      var TabIndexHigh = document.querySelector("${this.tabIndex}");

      TabIndexHigh.removeAttribute("tabindex");`;
      this.code = script;
    } else if (this.sourceElement === 7) {
      var script = `
    var Lowerheading = document.querySelector("${this.selectorValue}") ;
 
  Lowerheading.outerHTML = '<${this.propertyValue}>' + Lowerheading.innerHTML + '</${this.propertyValue}>'`;
      this.code = script;
    } else if (this.sourceElement === 8) {
      var script = `
      var EmptyHeading = document.querySelector("${this.selectorValue}") ;

      EmptyHeading.innerHTML = '${this.propertyValue}';`;
      this.code = script;
    } else if (this.sourceElement === 9) {
      var script = `
      var Element = document.querySelector("${this.selectorValue}");

      Element.removeAttribute('${this.propertyValue}');`;
      this.code = script;
    } else if (this.sourceElement === 10) {
      var script = `
      var InvalidLang = document.querySelector("${this.selectorValue}");

      InvalidLang.setAttribute('lang','${this.propertyValue}');`;
      this.code = script;
    } else if (this.sourceElement === 11) {
      var script = `
      var Element = document.querySelector("${this.selectorValue}");

      Element.setAttribute('tabindex','${this.propertyValue}');`;
      this.code = script;
    } else if (this.sourceElement === 12) {
      var script = `
      var marquee = document.querySelector("${this.selectorValue}");

      marquee.outerHTML = '<${this.propertyValue}>' + marquee.innerHTML + '</${this.propertyValue}>';`;
      this.code = script;
    } else if (this.sourceElement === 13) {
      var script = `
      var DivWithList = document.querySelector("${this.selectorValue}");

      var newElement = document.createElement('${this.propertyValue}');
      var newChildNodes = DivWithList.childNodes; 
      for (var i = 0; i < newChildNodes.length;i++) {
        if (newChildNodes[i].nodeName == 'LI') {
          newElement.appendChild(newChildNodes.item(i));
          newChildNodes.item(0).parentNode.insertBefore(newElement, newChildNodes.item(i));
       
       }
      }`;
      this.code = script;
    } else if (this.sourceElement === 15) {
      var script = `
      document.querySelector("${this.selectorValue}").style.color = '${this.propertyValue}';`;
      this.code = script;
    } else if (this.sourceElement === 17) {
      var script = `
      document.querySelector("${this.selectorValue}").setAttribute("id","${this.propertyValue}");`;
      this.code = script;
    } else if (this.sourceElement === 18) {
      var script = `
      document.querySelector("${this.selectorValue}").setAttribute("title","${this.propertyValue}");`;
      this.code = script;
    } else if (this.sourceElement === 16) {
      var script = `
      var DivWithList = document.querySelector("${this.dTDDValue}");

      var newElement = document.createElement('dl');
      var newChildNodes = DivWithList.childNodes; 
      for (var i = 0; i < newChildNodes.length;i++) {
      if ((newChildNodes[i].nodeName == 'DT')|| (newChildNodes[i].nodeName == 'DD') ) {
      newElement.appendChild(newChildNodes.item(i));
      newChildNodes.item(0).parentNode.insertBefore(newElement, newChildNodes.item(i));
 
 }
}`;
      this.code = script;
    } else if (this.sourceElement === 14) {
      var script = `
      document.querySelector("${this.selectorValue}").setAttribute('${
        this.properties.find((p) => p.id === this.property).value
      }', '${this.attributeValue}')`;

      this.code = script;
    }
  }

  copyCode() {
    const selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = this.code;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }

  clear() {
    this.code = "";
    this.selectorValue = "";
    this.propertyValue = "";
    this.dTDDValue = "";
    this.pageLanguage = "";
    this.attributeValue = "";
  }
  elementSelectChange(e) {
    console.log(e, this.sourceElement);
    this.clear();
  }
}

// get

// document.getElementByQuerySelector('abc').aria-labelledby="{id}"
