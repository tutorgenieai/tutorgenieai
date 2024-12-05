//@ts-nocheck
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { OnApproveData, OnApproveActions } from "@paypal/paypal-js";

interface PayPalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPayPalClick: (details: any) => void;
}

const PayPalDialog: React.FC<PayPalDialogProps> = ({
  isOpen,
  onClose,
  onPayPalClick,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>PayPal Payment</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: "9.99",
                    },
                  },
                ],
              });
            }}
            onApprove={(data: OnApproveData, actions: OnApproveActions) => {
              if (actions.order) {
                return actions.order.capture().then((details) => {
                  onPayPalClick(details);
                  onClose();
                });
              } else {
                console.error("actions.order is undefined");
                return Promise.reject("actions.order is undefined");
              }
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PayPalDialog;
