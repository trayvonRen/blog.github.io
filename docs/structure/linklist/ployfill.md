## 单链表
### java
```java
class ListNode {
    int value;
    ListNode next;

    ListNode(int x) { 
        this.value = x; 
    }
}

class MyLinkedList {
    public int size;
    ListNode head;
    /** Initialize your data structure here. */
    public MyLinkedList() {
        this.head = new ListNode(0);
        this.size = 0;
    }
    
    /** Get the value of the index-th node in the linked list. If the index is invalid, return -1. */
    public int get(int index) {
        if(index > size - 1 || index < 0) {
            return -1;
        }

        ListNode result = this.head;
        for(int i = 0; i < index + 1; i++) {
            result = result.next;
        }
        return result.value;
    }
    
    /** Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. */
    public void addAtHead(int val) {
        this.addAtIndex(0, val);
    }
    
    /** Append a node of value val to the last element of the linked list. */
    public void addAtTail(int val) {
        this.addAtIndex(this.size, val);
    }
    
    /** Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. */
    public void addAtIndex(int index, int val) {
        if(index > size + 1 || index < 0) return;
        ListNode pre = this.head;
        ListNode last = null;

        ListNode newListNode = new ListNode(val);
        for(int i = 0; i < index; i++) {
            pre = pre.next;
        }

        last = pre.next;
        pre.next = newListNode;
        newListNode.next = last;
        this.size++;
    }
    
    /** Delete the index-th node in the linked list, if the index is valid. */
    public void deleteAtIndex(int index) {
        if(index > size - 1|| index < 0) return;
        ListNode pre = this.head;
        ListNode last = null;

        for(int i = 0; i < index; i++) {
            pre = pre.next;
        }

        last = pre.next.next;
        pre.next = last;
        this.size--;
    }
}
```